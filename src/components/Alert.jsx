import React from "react";

const Alert = ({ content, bgcolor }) => {
  return (
    <div
      className={`${bgcolor} w-1/2 md:w-1/4 h-8 md:h-10 fixed top-1 right-1 z-10 p-2 flex items-center rounded-md`}
    >
      <p className="text-[9px] md:text-xs font-medium capitalize ml-2 text-slate-600">
        {content}
      </p>
    </div>
  );
};

export default Alert;
