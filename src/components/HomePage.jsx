import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import fullscreenIcon from "../assets/fullscreen.svg";
import { useBlog } from "../../hooks/useblog";
import Footer from "./Footer";
import Header from "./Header";
import spinnerImg from "../assets/spinner.svg";
import Alert from "./Alert";

const HomePage = () => {
  const { blogs, alert } = useBlog();
  const [selectedBlog, setSelectedBlog] = useState(blogs[0]);
  useEffect(() => {
    setSelectedBlog(blogs[0]);
  }, [blogs.length]);

  return (
    <div className="bg-white min-h-screen">
      {alert.value && <Alert content={alert.content} bgcolor={alert.bgColor} />}
      <Header />
      {!blogs.length ? (
        <img
          src={spinnerImg}
          className="w-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          alt="spinner gif"
        />
      ) : (
        <>
          <main className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 relative">
              <img
                src={selectedBlog?.profile_url}
                alt={selectedBlog?.title}
                className="w-full h-[200px] object-contain rounded-md mb-5"
              />
              <h2 className="text-2xl font-bold text-[#970747]">
                {selectedBlog?.title}
              </h2>
              <p className="text-[#000] text-xs mb-4">
                By {selectedBlog?.author} on{" "}
                {selectedBlog?.updatedAt.toString().slice(0, 10)}
              </p>
              <p className="text-[#000]">{selectedBlog?.content}</p>
              <NavLink to={`/blog/${selectedBlog?._id}`}>
                <img
                  src={fullscreenIcon}
                  className="w-3 md:w-5 absolute bottom-2 right-2"
                  alt="fullscreen.svg"
                />
              </NavLink>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 h-[500px] overflow-y-auto">
              <ul className="space-y-4">
                {blogs.map((blog) => (
                  <li
                    key={blog._id}
                    className="flex items-start space-x-4 border-b pb-2 cursor-pointer"
                    onClick={() => setSelectedBlog(blog)}
                  >
                    <img
                      src={blog.profile_url}
                      alt={blog.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-[#970747]">
                        {blog.title}
                      </h4>
                      <p className="text-gray-700 text-sm">
                        By {blog.author} on{" "}
                        {blog.updatedAt.toString().slice(0, 10)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </main>
          <Footer textColor="#fff" bgColor="#970747" />
        </>
      )}
    </div>
  );
};

export default HomePage;
