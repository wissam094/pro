import React, { useContext } from "react";
import UserContext from "../../context/userContext";
import { Link } from "react-router-dom";
import Footer from "../pages/Footer";
import "./home.css";
export default function Home() {
  const { userData } = useContext(UserContext);
  return (
    <div className="img">
      {userData.user ? (
        <p style={{ color: "white" }}>Welcome {userData.user.displayName}</p>
      ) : (
        <>
          <span>You are not logged in</span>
          <Link to="/login">Log in</Link>
        </>
      )}
      <Footer style={{ marginRight: "100px", width: "100%" }} />
    </div>
  );
}
