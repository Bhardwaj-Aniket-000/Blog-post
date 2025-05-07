import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlog } from "../../hooks/useblog";
import spinnerGif from "../assets/spinner.svg";
import VerticalAlign from "../assets/vertical-align.svg";
import Popup from "./Popup";
import Footer from "./Footer";

const DeleteBlog = () => {
  const { blogs, handleDelete, spinner } = useBlog();
  const [clicked, setClicked] = useState(false);

  const { id } = useParams(); // Get the blog ID from the URL
  // const navigate = useNavigate();

  const blog = blogs.find((blog) => blog._id === id);
  if (!blog) {
    return <p className="text-center text-gray-600">Blog not found!</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {spinner && (
        <img
          src={spinnerGif}
          className="w-8 absolute top-1/2 -translate-y-1/2 left-1/2 -translte-y-1/2"
          alt="spinner-svg"
        />
      )}
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-[#970747]">{blog.title}</h1>
      </div>
      <main className="container mx-auto px-4 py-8 relative">
        <div className="bg-white rounded-lg shadow-md p-6 relative">
          <img
            src={VerticalAlign}
            className="w-6 absolute right-2 top-2 cursor-pointer"
            alt="vertical-align"
            onClick={() => setClicked(!clicked)}
          />
          {clicked && <Popup id={id} />}
          <img
            src={blog?.profile_url}
            alt={blog.title}
            className="w-full h-[200px] object-contain rounded-md mb-4"
          />
          <p className="text-[#970747] text-sm mb-4">
            By {blog.author} on {blog.updatedAt.toString().slice(0, 10)}
          </p>
          <p className="text-gray-700">{blog.content}</p>
        </div>
        <button
          className="cursor-pointer bg-[crimson] p-2 px-5 mt-2 text-white capitalize rounded-sm"
          onClick={() => handleDelete(id)}
        >
          delete
        </button>
      </main>
      <Footer textColor="#970747" />
    </div>
  );
};

export default DeleteBlog;
