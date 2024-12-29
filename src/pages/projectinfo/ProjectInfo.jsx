import React, { useContext, useEffect, useState } from 'react';
import myContext from '../../context/myContext';
import { useParams } from 'react-router';
import { Timestamp, addDoc, collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfiguration';
import Loader from '../../components/loader/Loader';
import toast from 'react-hot-toast';

function BlogInfo() {
  const context = useContext(myContext);
  const { setloading, loading } = context;
  const params = useParams();
  const [getBlogs, setGetBlogs] = useState();
  const [fullName, setFullName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [allComment, setAllComment] = useState([]);

  const getAllBlogs = async () => {
    setloading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "blogPost", params.id));
      if (productTemp.exists()) {
        setGetBlogs(productTemp.data());
      }
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  }

  useEffect(() => {
    getAllBlogs();
    window.scrollTo(0, 0);
  }, []);

  function createMarkup(c) {
    return { __html: c };
  }

  const addComment = async () => {
    const userRef = collection(fireDB, "blogPost/" + `${params.id}/` + "comment");
    try {
      await addDoc(userRef, {
        fullName,
        commentText,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
      });
      toast.success('Comment Added Successfully');
      setFullName("");
      setCommentText("");
    } catch (error) {
      console.log(error);
    }
  }

  const getcomment = async () => {
    try {
      const q = query(
        collection(fireDB, "blogPost/" + `${params.id}/` + "comment/"),
        orderBy('time')
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setAllComment(productsArray);
      });
      return () => data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getcomment();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      <section className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <Loader />
        ) : (
          <div className="space-y-8">
            {/* Thumbnail */}
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <img
                alt="blog thumbnail"
                className="w-full h-full object-cover"
                src={getBlogs?.thumbnail}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Title and Date */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-green-400">
                {getBlogs?.blogs?.title}
              </h1>
              <p className="text-gray-400">
                {getBlogs?.date}
              </p>
              <div className="border-b border-gray-800" />
            </div>

            {/* Blog Content */}
            <div className="prose prose-lg prose-invert max-w-none">
              <div className="[&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-green-400 [&>h1]:mb-4
                            [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mb-3
                            [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-white [&>h3]:mb-3
                            [&>p]:text-gray-300 [&>p]:mb-4 [&>p]:leading-relaxed
                            [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:text-gray-300 [&>ul]:mb-4
                            [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:text-gray-300 [&>ol]:mb-4
                            [&>img]:rounded-xl [&>img]:my-6"
                dangerouslySetInnerHTML={createMarkup(getBlogs?.blogs?.content)}>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-12 space-y-6">
              {/* <h2 className="text-2xl font-bold text-green-400">Comments</h2> */}
              
              {/* Comment Form */}
              {/* <div className="bg-gray-900 p-6 rounded-xl space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <textarea
                  placeholder="Write your comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 h-32"
                />
                <button
                  onClick={addComment}
                  className="px-6 py-2 bg-green-400 text-black rounded-lg font-medium hover:bg-green-300 transition-all"
                >
                  Post Comment
                </button>
              </div> */}

              {/* Comments List */}
              {/* <div className="space-y-4">
                {allComment.map((comment) => (
                  <div key={comment.id} className="bg-gray-900 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-green-400">{comment.fullName}</h3>
                      <span className="text-gray-400 text-sm">{comment.date}</span>
                    </div>
                    <p className="text-gray-300">{comment.commentText}</p>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default BlogInfo;