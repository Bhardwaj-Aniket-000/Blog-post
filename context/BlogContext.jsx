import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const UserAuthContext = createContext();

export const BlogProvider = ({ children }) => {
  const navigate = useNavigate();
  const [spinner, setSpinner] = useState(false);

  // fetch all blogs from server...
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/getblogs`, {
      method: "get",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setBlogs(res.response);
      })
      .catch((err) => {
        setAlert({
          value: true,
          content: `Technical issue, Try Again Later`,
          bgColor: "bg-red-200",
        });
        setTimeout(() => {
          setAlert({
            value: false,
            content: ``,
            bgColor: "",
          });
        }, 2000);
      });
  }, [blogs.length]);

  // create Blogs....
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    image: "",
  });
  const [alert, setAlert] = useState({
    value: false,
    content: "",
    bgColor: "",
  });
  function handleCreate(e) {
    e.preventDefault();
    setSpinner(true);
    const newFormData = new FormData();
    newFormData.append("title", formData.title);
    newFormData.append("content", formData.content);
    newFormData.append("author", formData.author);
    newFormData.append("image", formData.image);

    fetch(`${import.meta.env.VITE_BACKEND_URL}/createblog`, {
      // not using procees.env because it is use only webpack or another bundler
      method: "post",
      body: newFormData,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setSpinner(false);
        if (!res.success) {
          setAlert({
            value: true,
            content: `Internal Server Error, try Again !`,
            bgColor: "bg-red-200",
          });
          setTimeout(() => {
            setAlert({
              value: false,
              content: "",
              bgColor: "",
            });
          }, 2000);
          return;
        }
        setAlert({
          value: true,
          content: `Blog Created Successfully`,
          bgColor: "bg-green-200",
        });
        setBlogs([...blogs, res.response]);
        setTimeout(() => {
          navigate("/");
          setAlert({
            value: false,
            content: "",
            bgColor: "",
          });
        }, 2000);
      })
      .catch((err) => {
        setSpinner(false);
        setAlert({
          value: true,
          content: `Something Went Wrong`,
          bgColor: "bg-red-200",
        });
        setTimeout(() => {
          setAlert({
            value: false,
            content: ``,
            bgColor: "",
          });
        }, 2000);
      });
  }

  // handleUpdate...
  function handleUpdate(e, blogID, formData) {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("title", formData.title);
    newFormData.append("content", formData.content);
    newFormData.append("author", formData.author);
    newFormData.append("image", formData.image);

    setSpinner(true);

    fetch(`${import.meta.env.VITE_BACKEND_URL}/modifyblog/${blogID}`, {
      method: "put",
      body: newFormData,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setSpinner(false);
        if (!res.success) {
          setAlert({
            value: true,
            content: res.message,
            bgColor: "bg-red-200",
          });
          setTimeout(() => {
            setAlert({
              value: false,
              content: "",
              bgColor: "",
            });
          }, 2000);
          return;
        }
        setAlert({
          value: true,
          content: `Blog Updated Successfully`,
          bgColor: "bg-green-200",
        });
        setBlogs(
          blogs.map((blog) =>
            blog._id === blogID ? { ...blog, ...formData } : blog
          )
        );
        setTimeout(() => {
          navigate(`/`);
          setAlert({
            value: false,
            content: "",
            bgColor: "",
          });
        }, 2000);
      })
      .catch((err) => {
        setSpinner(false);
        setAlert({
          value: true,
          content: `Something Went Wrong, try Again !`,
          bgColor: "bg-red-200",
        });
        setTimeout(() => {
          setAlert({
            value: false,
            content: "",
            bgColor: "",
          });
        }, 2000);
      });
  }

  // handleDelete...
  function handleDelete(id) {
    setSpinner(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/deleteblog/${id}`, {
      method: "delete",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setSpinner(false);
        if (!res.success) {
          setAlert({
            value: true,
            content: `Internal Server Error, try Again !`,
            bgColor: "bg-red-200",
          });
          setTimeout(() => {
            setAlert({
              value: false,
              content: "",
              bgColor: "",
            });
          }, 2000);
          return;
        }
        setAlert({
          value: true,
          content: `Blog Deleted Successfully`,
          bgColor: "bg-green-200",
        });
        setBlogs(res.response);
        navigate("/");
        setTimeout(() => {
          setAlert({
            value: false,
            content: "",
            bgColor: "",
          });
        }, 2000);
      })
      .catch((err) => {
        setSpinner(false);
        setAlert({
          value: true,
          content: `Something Went Wrong, try Again !`,
          bgColor: "bg-red-200",
        });
        setTimeout(() => {
          setAlert({
            value: false,
            content: "",
            bgColor: "",
          });
        }, 2000);
      });
  }

  return (
    <UserAuthContext.Provider
      value={{
        blogs,
        setBlogs,
        handleCreate,
        formData,
        setFormData,
        alert,
        setAlert,
        handleUpdate,
        handleDelete,
        spinner,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthContext;
