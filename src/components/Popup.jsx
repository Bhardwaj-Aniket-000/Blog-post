import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import arrow from "../assets/back-arrow.svg";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/edit.svg";

const Popup = ({ id }) => {
  const navigate = useNavigate();
  const location = useLocation()

  return (
    <>
      <div className="absolute top-1.5 right-8 flex gap-4 bg-[#970747] p-2 rounded-full cursor-pointer">
        <img
          src={deleteIcon}
          className="w-4"
          onClick={() => navigate(`/delete/${id}`)}
          alt="delete-Icon"
        />
        <img
          src={arrow}
          className="w-4"
          onClick={() => navigate("/")}
          alt="back-arrow-Icon"
        />
        {!location.pathname.includes("delete") && (
          <img
            src={editIcon}
            className="w-4"
            onClick={() => navigate(`/update/${id}`)}
            alt="edit-Icon"
          />
        )}
      </div>
    </>
  );
};

export default Popup;
