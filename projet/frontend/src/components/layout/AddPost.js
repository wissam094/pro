import React, { useState } from "react";

import Axios from "axios";

export default function AddPost() {
  const [title, setTitle] = useState();
  const [tags, setTags] = useState();
  const [resume, setResume] = useState();
  const [html, setHtml] = useState();
  const [date, setDate] = useState();
  const [error, setError] = useState();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const Post = { title, resume, tags, html, date };

      const loginRes = await Axios.post("http://localhost:5000/post", Post);
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div className="page" key="wissam">
      <form className="form" onSubmit={submit}>
        <label htmlFor="titre">title</label>
        <input
          id="title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="htmlFor">tags</label>
        <input
          id="tags"
          type="text"
          onChange={(e) => setTags(e.target.value)}
        />

        <label htmlFor="resume">resume</label>
        <input
          id="resume"
          type="text"
          onChange={(e) => setResume(e.target.value)}
        />
        <label htmlFor="html">html</label>
        <input
          id="html"
          type="text"
          onChange={(e) => setHtml(e.target.value)}
        />

        <input type="submit" value="Save" />
      </form>
    </div>
  );
}
