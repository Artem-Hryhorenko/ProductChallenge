import React from "react";

const Footer = () => {
  return (
    <div className="d-flex justify-content-between custom-footer">
      <div className=" ml-4 footer-left font-weight-bold">
        <a href="">Bussiness</a>
        <span className="footer-border" />
        <a href="">About</a>
      </div>
      <div className="mr-4 footer-right font-weight-bold">
        <a href="">Privacy & Terms</a>
        <span className="footer-border" />
        <a href="">Settings</a>
      </div>
    </div>
  );
};

export default Footer;
