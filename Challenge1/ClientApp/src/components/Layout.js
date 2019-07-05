import React from "react";
import NavMenu from "./NavMenu";
import Footer from "./Footer";

export default props => (
  <div className="top-wrapper">
    <NavMenu />
    <div className="content-custom-block">{props.children}</div>
    <Footer />
  </div>
);
