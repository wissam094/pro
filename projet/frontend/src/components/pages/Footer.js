import React from "react";
import "./Footer.css";
export default function Footer() {
  return (
    <div className="fotter">
      Karhabti.tn sur les réseaux sociaux :
      <div className="items">
        <i className="fab fa-twitter" style={{ fontSize: "30px" }}></i>
        <i className="fab fa-facebook" style={{ fontSize: "30px" }}></i>
        <i className="fab fa-linkedin" style={{ fontSize: "30px" }}></i>
        <i className="fab fa-youtube" style={{ fontSize: "30px" }}></i>
      </div>
      <div>Copyright &copy; {new Date().getFullYear()} Karhabti.tn</div>
    </div>
  );
}
