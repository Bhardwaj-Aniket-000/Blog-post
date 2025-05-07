import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import BlogDetails from "./components/BlogDetails";
// import OtherHomePage from "./components/OtherHomePage";
import DeleteBlog from "./components/DeleteBlog";
import { BlogProvider } from "../context/BlogContext";
import UpdateBlog from "./components/UpdateBlog";
import CreateBlog from "./components/CreateBlog";

const App = () => {
  return (
    <BlogProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/delete/:id" element={<DeleteBlog />} />
        <Route path="/update/:id" element={<UpdateBlog />} />
        <Route path="/create" element={<CreateBlog />} />
      </Routes>
    </BlogProvider>
  );
};

export default App;
