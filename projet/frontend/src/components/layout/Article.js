import React from "react";
import Axios from "axios";
import Comment from "../comments/Comment";
class Article extends React.Component {
  state = {
    post: {},
  };
  componentDidMount() {
    this.getPost();
  }

  async getPost() {
    const res = await Axios.get(
      `http://localhost:5000/post/${this.props.match.params.id}`
    );
    this.setState({ post: res.data });
  }

  renderHTML() {
    return { __html: this.state.post.html };
  }

  renderPost() {
    return <div dangerouslySetInnerHTML={this.renderHTML()}></div>;
  }

  render() {
    return (
      <div>
        <div className="article">
          <p>{this.renderPost()}</p>
        </div>

        <Comment postId={this.state.post._id} />
      </div>
    );
  }
}
export default Article;
