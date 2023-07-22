import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="fixed-bottom d-flex justify-content-center bg-light text-dark p-3">
      <p>© {year !== 2023 ? `2023 - ${year}` : "2023"} Tmi Veikko Laitinen</p>
    </footer>
  );
};

export default Footer;
