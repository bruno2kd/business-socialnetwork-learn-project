import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// actions imports
import { getPosts } from "../../actions/postActions";
// components imports
import PostForm from "./PostForm";
import PostItem from "./PostItem";
import Spinner from "../common/Spinner";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postComponent;

    if (posts == null || loading) {
      postComponent = <Spinner />;
    } else {
      postComponent = posts.map(post => (
        <PostItem post={post} key={post._id} />
      ));
    }

    return (
      <div>
        <h1>Posts</h1>
        <PostForm />
        <div className="posts">
          <h2>Post Item</h2>
          {postComponent}
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
