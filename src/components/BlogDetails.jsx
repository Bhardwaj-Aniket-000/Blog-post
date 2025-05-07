import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Popup from "./Popup";
import VerticalAlign from "../assets/vertical-align.svg";
import { useBlog } from "../../hooks/useblog";

const BlogDetails = () => {
  const { id } = useParams();
  const { blogs } = useBlog();
  const [clicked, setClicked] = useState(false);

  const blog = blogs.find((blog) => blog._id == id);

  if (!blog) {
    return <p>Blog not found!</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-[#970747]">{blog.title}</h1>
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
            className="w-1/3 h-64 object-contain rounded-md mb-4"
          />
          <p className="text-[#970747] text-sm mb-4">
            By {blog.author} on {blog?.updatedAt.toString().slice(0, 10)}
          </p>
          <p className="text-gray-700">{blog.content}</p>
        </div>
      </main>
    </div>
  );
};

export default BlogDetails;
