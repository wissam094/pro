import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Axios from "axios";
import Header from "./components/layout/header";
import Home from "./components/pages/home";
import Footer from "./components/pages/Footer";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Admin from "./components/auth/Admin.js";
import UserContext from "./context/userContext";
import PostList from "./components/layout/PostList";
import Article from "./components/layout/Article";
import AddPost from "./components/layout/AddPost";
import Contact from "./components/pages/Contact";
//import Comment from "./components/comments/home-component";
export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5000/users/valid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/contact" component={Contact}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/register" component={Register}></Route>
              <Route exact path="/admin" component={Admin}></Route>
              <Route exact path="/post" component={PostList}></Route>
              <Route exact path="/addpost" component={AddPost}></Route>
              <Route exact path="/post/:id" component={Article}></Route>
            </Switch>
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
