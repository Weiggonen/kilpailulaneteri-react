import React from "react";
import logo from "../assets/images/sul-white-logo.png";

const TopBar = () => {
  return (
    <div className="bg-primary text-light py-3">
      <div className="container d-flex justify-content-center justify-content-lg-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            className="me-3"
            style={{ height: "50px" }}
          />
          <div>
            <h1
              className="m-0 fs-4 fs-lg-2"
              style={{
                fontFamily: "'Saira', sans-serif",
                letterSpacing: "4px",
              }}
            >
              KISAKALENTERI.NET
            </h1>
            <p className="m-0">
              Prototyyppi parannellusta kilpailukalenteri.fi palvelusta
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
