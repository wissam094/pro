import React from "react";
import { Link } from "react-router-dom";
import AuthOption from "../auth/authOption";
import { useHistory } from "react-router-dom";

export default function Header() {
  const history = useHistory();

  const PostList = () => history.push("/post");
  const Contact = () => history.push("/contact");

  return (
    <header id="header">
      <Link to="/">
        {" "}
        <h1 className="title">Karhabti.tn</h1>{" "}
      </Link>
      <nav className="auth-options">
        <button onClick={PostList}>Blog</button>
        <button onClick={Contact}>Contact us</button>
      </nav>
      <AuthOption />
    </header>
  );
}
