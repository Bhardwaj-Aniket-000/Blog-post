import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <header className="shadow bg-[#970747] flex items-center">
      <div className="container mx-auto px-1 py-4 flex gap-2 items-center">
        <img src={logo} className="w-12" alt="website-logo" />
        <h1 className="text-2xl font-bold text-white font-mono uppercase">
          Blog-Nest
        </h1>
      </div>
      {!location.pathname.includes("create") && (
        <button
          className="p-2 px-5 text-white  bg-[#bb115d] mr-2 outline-none rounded-sm font-[arial] text-sm cursor-pointer shadow-sm shadow-[#860841]"
          onClick={() => navigate("/create")}
        >
          Create
        </button>
      )}
    </header>
  );
};

export default Header;
