import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import Footer from "../pages/Footer";
import Pagination from "../pages/Pagination";
export default function PostList() {
  const { userData } = useContext(UserContext);
  const [articles, saveArticle] = useState([]);
  const history = useHistory();

  const [currentPage, setCurrentPage] = useState(1);
  const [employeePerPage] = useState(3);
  const indexOfLastJob = currentPage * employeePerPage;
  const indexOfFirstJob = indexOfLastJob - employeePerPage;
  const curr_employees = articles.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    const getArticles = async () => {
      const res = await Axios.get("http://localhost:5000/post/");
      saveArticle(res.data);
    };
    getArticles();
  }, []);

  // reformer date
  const renderdate = (dateString) => {
    const monthNames = ["Jan"];
    const date = new Date(dateString);
    return `${
      monthNames[date.getMonth()]
    }/${date.getDate()}/ ${date.getFullYear()}`;
  };
  // reforme tags
  const renderTags = (tags) => {
    return tags.map((tag) => {
      return <span key={tag}>{tag}</span>;
    });
  };

  const deletePost = async (id) => {
    await Axios.delete("http://localhost:5000/post/" + id);
  };
  const user = userData.user ? userData.user : null;
  const role = user ? user.role : "user";

  const Addpost = () => history.push("/addpost");
  const renderList = () => {
    return curr_employees.map((article) => {
      return (
        <div className="ensemble">
          <div key="a" className="postlist">
            <span>
              {" "}
              <Link to={`/post/${article._id}`}>{article.title}</Link> <br></br>
            </span>
            <span>Resume:{article.resume}</span> <br></br>
            <span>Created At :{renderdate(article.createdAt)}</span>
            <div>Tags :{renderTags(article.tags)}</div>
          </div>
          <div>
            {" "}
            {role === "admin" ? (
              <div className="delete">
                <button onClick={() => deletePost(article._id)}>
                  Delete post
                </button>
              </div>
            ) : null}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="pos">
      {renderList()}
      <div className="but">
        {role === "admin" ? <button onClick={Addpost}>AddPost</button> : null}

        <Pagination
          paginate={paginate}
          itemPerPage={employeePerPage}
          totalitems={articles.length}
          currentPage={currentPage}
        />
      </div>
      <div>
        {" "}
        <Footer style={{ marginRight: "100px", width: "100%" }} />
      </div>
    </div>
  );
}
