import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import JoditEditor from "jodit-react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfiguration";
import axios from "axios";

function CreateBlog() {
  const context = useContext(myContext);
  const { mode } = context;

  const [blogs, setBlogs] = useState({
    title: "",
    category: "",
    content: "",
    githubUrl: "",
    websiteUrl: "",
    time: Timestamp.now(),
  });
  const [thumbnail, setThumbnail] = useState();

  const editor = useRef(null);
  const navigate = useNavigate();

  // Category options
  const categories = [
    "web development",
    "game development",
    "python",
    "c++",
    "other"
  ];

  // Cloudinary Image Upload Function
  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'preset'); // Replace with your Cloudinary preset
    formData.append('cloud_name', 'dkvaguui6'); // Replace with your cloud name

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dkvaguui6/image/upload',
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw new Error("Cloudinary upload failed");
    }
  };

  const addPost = async () => {
    if (
      blogs.title === "" ||
      blogs.category === "" ||
      blogs.content === "" ||
      // blogs.githubUrl === "" ||
      // blogs.websiteUrl === "" ||
      !thumbnail
    ) {
      return toast.error("All fields are required");
    }

    try {
      // Upload image to Cloudinary
      const imageUrl = await uploadImageToCloudinary(thumbnail);
      
      // Add document to Firestore
      const productRef = collection(fireDB, "blogPost");
      await addDoc(productRef, {
        blogs,
        thumbnail: imageUrl,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      
      navigate("/dashboard");
      toast.success("Post Added Successfully");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
    }),
    []
  );

  const createMarkup = (c) => {
    return { __html: c };
  };

  return (
    <div className="container mx-auto max-w-4xl py-6 px-4">
      <div
        className="p-5 rounded-lg shadow-lg"
        style={{
          background: mode === "dark" ? "#2f3640" : "#f1f5f9",
          borderBottom: mode === "dark" ? "4px solid #f1f5f9" : "4px solid #1e293b",
        }}
      >
        {/* Top Item */}
        <div className="mb-4 flex justify-between items-center">
          <Link to="/dashboard">
            <BsFillArrowLeftCircleFill
              size={30}
              className="text-gray-500 hover:text-gray-700 transition"
            />
          </Link>
          <h4
            className="text-lg font-semibold"
            style={{
              color: mode === "dark" ? "#ffffff" : "#000000",
            }}
          >
            Add Project
          </h4>
        </div>

        {/* Thumbnail Upload */}
        <div className="mb-5">
          {thumbnail && (
            <img
              className="w-full h-48 object-cover rounded-md mb-4"
              src={URL.createObjectURL(thumbnail)}
              alt="Thumbnail"
            />
          )}
          <label
            className="block mb-2 font-semibold"
            style={{ color: mode === "dark" ? "#ffffff" : "#000000" }}
          >
            Upload Thumbnail
          </label>
          <input
            type="file"
            className="block w-full p-2 text-sm border rounded-md bg-gray-100 dark:bg-gray-700 shadow-sm"
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
        </div>

        {/* Title Input */}
        <div className="mb-5">
          <input
            className="w-full p-2 text-sm border rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter Your Title"
            value={blogs.title}
            onChange={(e) => setBlogs({ ...blogs, title: e.target.value })}
          />
        </div>

        {/* Category Select - Updated */}
        <div className="mb-5">
          <select 
            className="w-full p-2 text-sm border rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
            value={blogs.category}
            onChange={(e) => setBlogs({ ...blogs, category: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* GitHub Link Input */}
        {/* <div className="mb-5">
          <input
            className="w-full p-2 text-sm border rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter GitHub URL"
            value={blogs.githubUrl}
            onChange={(e) => setBlogs({ ...blogs, githubUrl: e.target.value })}
          />
        </div> */}

        {/* Website Link Input */}
        {/* <div className="mb-5">
          <input
            className="w-full p-2 text-sm border rounded-md shadow-sm bg-gray-100 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter Website URL"
            value={blogs.websiteUrl}
            onChange={(e) => setBlogs({ ...blogs, websiteUrl: e.target.value })}
          />
        </div> */}

        {/* Jodit Editor */}
        <div className="mb-5">
          <JoditEditor
            ref={editor}
            value={blogs.content}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => setBlogs({ ...blogs, content: newContent })}
          />
        </div>

        {/* Submit Button */}
        <button
          className="w-full py-2 text-lg font-bold rounded-md shadow-md bg-blue-500 text-white hover:bg-blue-700 transition"
          onClick={addPost}
        >
          Submit
        </button>
      </div>

      {/* Preview Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-center mb-4">Preview</h2>
        <div className="content p-5 rounded-lg shadow-lg bg-gray-50 dark:bg-gray-800">
          <div
            className={`[&>h1]:text-3xl [&>h1]:font-bold [&>p]:text-base 
            ${mode === "dark" ? "[&>h1]:text-red-400 [&>p]:text-gray-200" : "[&>h1]:text-gray-800 [&>p]:text-gray-700"}`}
            dangerouslySetInnerHTML={createMarkup(blogs.content)}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;