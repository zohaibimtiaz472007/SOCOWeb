import React, { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { useNavigate } from "react-router";

function AllBlogs() {
  const context = useContext(myContext);
  const { mode, getAllBlog } = context;
  const [selectedCategory, setSelectedCategory] = useState("all");

  const navigate = useNavigate();

  // Get unique categories from blogs
  const categories = ["all", ...new Set(getAllBlog.map(item => item.blogs.category))];

  // Filter blogs based on selected category
  const filteredBlogs = selectedCategory === "all" 
    ? getAllBlog
    : getAllBlog.filter(item => item.blogs.category === selectedCategory);

  // Function to render HTML content
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto max-w-7xl">
          {/* Top Heading */}
          <div className="mb-5">
            <h1
              className="text-center text-2xl font-bold"
              style={{ color: mode === "dark" ? "white" : "black" }}
            >
              Courses
            </h1>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center mb-8">
            <select
              className="px-4 py-2 rounded-lg border shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                color: mode === "dark" ? "white" : "black",
                background: mode === "dark" ? "rgb(30, 41, 59)" : "white",
              }}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" 
                    ? "All Categories" 
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Main Content */}
          <div className="flex flex-wrap justify-center -m-4 mb-5">
            {filteredBlogs.length > 0 ? (
              <>
                {filteredBlogs.map((item, index) => {
                  const { thumbnail, id, date, blogs } = item;
                  return (
                    <div className="p-4 md:w-1/3" key={index}>
                      <div
                        style={{
                          background:
                            mode === "dark" ? "rgb(30, 41, 59)" : "white",
                          borderBottom:
                            mode === "dark"
                              ? " 4px solid rgb(226, 232, 240)"
                              : " 4px solid rgb(30, 41, 59)",
                        }}
                        className={`h-full shadow-lg hover:-translate-y-1 cursor-pointer hover:shadow-gray-400
                                                ${
                                                  mode === "dark"
                                                    ? "shadow-gray-700"
                                                    : "shadow-xl"
                                                } 
                                                rounded-xl overflow-hidden`}
                      >
                        {/* Blog Thumbnail */}
                        <img
                          onClick={() => navigate(`/bloginfo/${id}`)}
                          className="w-full"
                          src={thumbnail}
                          alt="blog"
                        />

                        {/* Top Items */}
                        <div className="p-6">
                          {/* Blog Date and Category */}
                          <div className="flex justify-between items-center mb-1">
                            <h2
                              className="tracking-widest text-xs title-font font-medium"
                              style={{
                                color:
                                  mode === "dark"
                                    ? "rgb(226, 232, 240)"
                                    : "rgb(30, 41, 59)",
                              }}
                            >
                              {date}
                            </h2>
                            <span
                              className="text-xs font-medium px-2 py-1 rounded-full"
                              style={{
                                color:
                                  mode === "dark"
                                    ? "rgb(226, 232, 240)"
                                    : "rgb(30, 41, 59)",
                                background:
                                  mode === "dark"
                                    ? "rgba(226, 232, 240, 0.1)"
                                    : "rgba(30, 41, 59, 0.1)",
                              }}
                            >
                              {blogs.category}
                            </span>
                          </div>

                          {/* Blog Title */}
                          <h1
                            className="title-font text-lg font-bold text-gray-900 mb-3"
                            style={{
                              color:
                                mode === "dark"
                                  ? "rgb(226, 232, 240)"
                                  : "rgb(30, 41, 59)",
                            }}
                          >
                            {blogs.title}
                          </h1>

                          {/* Blog Description */}
                          <div
                            className="leading-relaxed mb-3"
                            style={{
                              color:
                                mode === "dark"
                                  ? "rgb(226, 232, 240)"
                                  : "rgb(30, 41, 59)",
                            }}
                          >
                            Click on the image to Check the Detail about my Project
                          </div>

                          {/* Buttons for Github and Website */}
                          <div className="flex justify-between items-center mt-4">
                            <button
                              onClick={() => navigate(`/bloginfo/${id}`)}
                              className="bg-green-400 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Open it.
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <h1 className="text-xl font-bold">Not Found</h1>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default AllBlogs;