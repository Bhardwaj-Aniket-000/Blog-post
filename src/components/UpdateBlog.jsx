import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useBlog } from "../../hooks/useblog";
import Alert from "./Alert";
import spinnerImg from "../assets/spinner.svg";

const UpdateBlog = () => {
  const { blogs, handleUpdate, alert, spinner } = useBlog();
  const { id } = useParams(); // Get the blog ID from the URL

  const blog = blogs.find((blog) => blog?._id === id);

  if (!blog) {
    return <p className="text-center text-gray-600">Blog not found!</p>;
  }
  const [formData, setFormData] = useState({
    title: blog.title,
    content: blog.content,
    author: blog.author,
    image: blog.profile_url,
  });

  return (
    <div className="bg-white min-h-screen">
      {alert.value && <Alert content={alert.content} bgcolor={alert.bgColor} />}
      {spinner && (
        <img
          src={spinnerImg}
          className="w-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          alt="spinner-gif"
        />
      )}
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-[#970747]">Update Blog</h1>
      </div>

      <main className="container mx-auto px-4 py-8">
        <form
          onSubmit={(e) => handleUpdate(e, id, formData)}
          className="bg-white rounded-lg shadow-md p-6 space-y-4"
          encType="multipart/form-data"
        >
          <div>
            <label className="block text-[#970747] font-bold mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-[#970747] font-bold mb-2">
              Content
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-md p-2"
              rows="6"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-[#970747] font-bold mb-2">
              Author
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, author: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-[#970747] font-bold ">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              id="image"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, image: e.target.files[0] }))
              }
              className="w-full border border-gray-300 rounded-md p-2 outline-none cursor-pointer"
            />
          </div>
          <button
            type="submit"
            className="bg-[#970747] text-white px-4 py-2 rounded-md hover:bg-[#85063e] cursor-pointer"
            disabled={spinner}
          >
            Save Changes
          </button>
        </form>
      </main>
    </div>
  );
};

export default UpdateBlog;
