import React from "react";

const Footer = ({textColor,bgColor}) => {
  return (
    <footer className={`${bgColor} shadow mt-8`}>
      <div className="container mx-auto px-4 py-6 text-center">
        <p className={`${textColor}`}>
          © 2025 My Blog. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
