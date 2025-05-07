import React from "react";
import { useNavigate } from "react-router-dom";
import { useBlog } from "../../hooks/useblog";
import Header from "./Header";
import Footer from "./Footer";
import Alert from "./Alert";
import spinnerImg from "../assets/spinner.svg";

const CreateBlog = () => {
  const { formData, setFormData, handleCreate, alert, spinner } = useBlog();
  const navigate = useNavigate();

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
      <Header />
      <div className="container mx-auto px-4 py-3">
        <h1 className="text-xl text-center font-bold font-[arial] text-[#970747]">
          Create Your Blog
        </h1>
      </div>

      <main className="container mx-auto px-4 py-3">
        <form
          onSubmit={handleCreate}
          className="bg-white rounded-lg shadow-md p-6 space-y-4"
          encType="multipart/form-data"
        >
          <div>
            <label className="block text-[#970747] font-bold">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-md p-2 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-[#970747] font-bold">Content</label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-md p-2 outline-none"
              rows="3"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-[#970747] font-bold ">Author</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, author: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-md p-2 outline-none"
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
            className="bg-[#970747] text-white px-4 py-2 rounded-md hover:bg-[#885c6f] cursor-pointer"
          >
            Create Blog
          </button>
          <button
            className="bg-[#970747] text-white px-4 py-2 ml-2 rounded-md hover:bg-[#85063e] cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Cancel
          </button>
        </form>
      </main>
      <Footer textColor="#fff" bgColor="#970747" />
    </div>
  );
};

export default CreateBlog;
