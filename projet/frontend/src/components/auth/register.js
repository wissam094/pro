import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import Axios from "axios";
import ErrorNotice from "../../components/misc/ErrorNotice";
import Footer from "../pages/Footer";
export default function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { email, password, passwordCheck, displayName };
      await Axios.post("http://localhost:5000/users/register", newUser);
      const loginRes = await Axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      sessionStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div>
      <div className="page">
        <h2 style={{ color: "dbd2d2" }}>Register</h2>
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        <form className="form" onSubmit={submit}>
          <label htmlFor="register-email">Email</label>
          <input
            id="register-email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Verify password"
            onChange={(e) => setPasswordCheck(e.target.value)}
          />

          <label htmlFor="register-display-name">Display name</label>
          <input
            id="register-display-name"
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <input type="submit" value="Register" />
        </form>
      </div>
      <div>
        {" "}
        <Footer style={{ marginRight: "100px", width: "100%" }} />
      </div>
    </div>
  );
}
