import React, { useContext } from "react";
import myContext from "../../context/myContext";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom';

function BlogPostCard() {
  const context = useContext(myContext);
  const { mode, getAllBlog } = context;

  const navigate = useNavigate();

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-center -m-4 mb-5">
            {getAllBlog.length > 0 ? (
              <>
                {getAllBlog.map((item, index) => {
                  const { thumbnail, id, date, blogs } = item;
                  return (
                    <div className="p-4 md:w-1/3" key={index}>
                      <div
                        style={{
                          background: mode === "dark" ? "rgb(30, 41, 59)" : "white",
                          borderBottom:
                            mode === "dark"
                              ? "4px solid rgb(226, 232, 240)"
                              : "4px solid rgb(30, 41, 59)",
                        }}
                        className={`h-full shadow-lg hover:-translate-y-1 cursor-pointer hover:shadow-gray-400
                          ${mode === "dark" ? "shadow-gray-700" : "shadow-xl"} 
                          rounded-xl overflow-hidden`}
                      >
                        <img
                          onClick={() => navigate(`/bloginfo/${id}`)}
                          className="w-full"
                          src={thumbnail}
                          alt="blog"
                        />
                        <div className="p-6">
                          <h2
                            className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                            style={{
                              color: mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
                            }}
                          >
                            {date}
                          </h2>
                          <h1
                            className="title-font text-lg font-bold text-gray-900 mb-3"
                            style={{
                              color: mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
                            }}
                          >
                            {blogs.title}
                          </h1>
                          {/* Render the content using dangerouslySetInnerHTML */}
                          <div
                            className="leading-relaxed mb-3"
                            style={{
                              color: mode === "dark" ? "rgb(226, 232, 240)" : "rgb(30, 41, 59)",
                            }}
                          
                          >
                            Click on the Card to Check Details About My Project
                            </div>

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
    </div>
  );
}

export default BlogPostCard;
