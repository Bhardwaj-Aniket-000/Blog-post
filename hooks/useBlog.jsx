import { useContext } from "react";
import BlogContext from "../context/BlogContext";

export const useBlog = () => {
  const {
    blogs,
    setBlogs,
    handleCreate,
    formData,
    setFormData,
    alert,
    handleUpdate,
    handleDelete,
    spinner,
  } = useContext(BlogContext);
  return {
    blogs,
    setBlogs,
    handleCreate,
    formData,
    setFormData,
    alert,
    handleUpdate,
    handleDelete,
    spinner,
  };
};
