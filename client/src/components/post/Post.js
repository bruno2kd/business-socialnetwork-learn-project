import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// actions imports
import { getPost } from "../../actions/postActions";

// component imports
import Spinner from "../common/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import NotFound from "../not-found/NotFound";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.post_id);
  }

  render() {
    const { post, loading } = this.props.post;
    console.log("AQUI POST");
    console.log(this.props);
    let postContent;
    if (post === null || loading) {
      postContent = <Spinner />;
    } else if (Object.keys(post).length === 0) {
      postContent = <NotFound />;
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <div className="comments">
            <CommentFeed postId={post._id} comments={post.comments} />
          </div>
        </div>
      );
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Back to Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
