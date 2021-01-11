import Axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import "./Comment.css";
import UserContext from "../../context/userContext";
function Comment(props) {
  console.log(props);
  const { userData } = useContext(UserContext);
  const [username, setUsername] = useState();
  const [content, setContent] = useState();
  const [error, setError] = useState();
  const [date, setDate] = useState();
  const [comments, saveComment] = useState([]);

  const user = userData.user;
  const role = user ? user.role : "guest";
  const name = user ? user.displayName : "wissam";
  const takeName = (name) => {
    setUsername(name);
  };
  useEffect(() => {
    const getComment = async () => {
      const res = await Axios.get("http://localhost:5000/comments/");
      saveComment(res.data);
    };
    getComment();
  }, []);
  // reformer date
  const renderdate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getHours()}:${date.getMinutes()}`;
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      const Comments = { username, content };

      const loginRes = await Axios.post(
        "http://localhost:5000/comments/",
        Comments
      );
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  const renderComment = () => {
    return comments.map((comment, i) => {
      return (
        <div>
          <div className="comment_card">
            <div className="comment_card_row" key={i}>
              <span>{comment.username} :</span>
            </div>
            <span style={{ color: "white", fontSize: "12px" }}>
              {comment.content}
            </span>{" "}
            <br></br>
            <di>
              {" "}
              <i class="fas fa-clock" style={{ fontSize: "10px" }}></i>
              <span style={{ color: "white", fontSize: "10px" }}>
                {renderdate(comment.createdAt)}
              </span>
            </di>
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <div className="wissam">
        {renderComment()}

        <p
          style={{
            color: "white",
          }}
        >
          Name
        </p>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />

        <p
          style={{
            color: "white",
          }}
        >
          Content
        </p>
        <textarea
          contentEditable="true"
          style={{
            height: "40px",
            width: "40%",
            border: "1px solid #ccc",
            padding: "5px 10px",
            outline: "none",
            color: "black",
            backgroundColor: "white",
          }}
          onChange={(e) => setContent(e.target.value)}
        />
        {role === "admin" || role === "user" ? (
          <button onClick={submit}>Send</button>
        ) : null}
      </div>
    </div>
  );
}
export default Comment;
