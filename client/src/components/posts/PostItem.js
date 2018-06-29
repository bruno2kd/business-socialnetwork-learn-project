import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import classnames from "classnames";

// Action imports
import { deletePost, likePost } from "../../actions/postActions";

class PostItem extends Component {
  constructor(props) {
    super(props);

    let firstCheck = this.props.post.likes.find(
      x => x.user === this.props.auth.user.id
    );
    firstCheck = firstCheck
      ? "text-secondary fas fa-thumbs-up"
      : "text-info fas fa-thumbs-up";

    this.state = {
      liked: firstCheck
    };
  }

  onDeleteClick(postId) {
    this.props.deletePost(postId);
  }

  onClickLike(postId) {
    this.props.likePost(postId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.post.likes !== nextProps.post.likes) {
      let checkLike = this.props.post.likes.find(
        x => x.user === this.props.auth.user.id
      );
      if (checkLike) {
        this.setState({ liked: "text-secondary fas fa-thumbs-up" });
      } else {
        this.setState({ liked: "text-info fas fa-thumbs-up" });
      }
    }
  }

  render() {
    // "text-secondary fas fa-thumbs-down"
    const { post, auth, showActions } = this.props;

    const postAvatar = post.avatar
      ? post.avatar
      : "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200";

    const deleteBtn =
      post.user === auth.user.id ? (
        <button
          onClick={this.onDeleteClick.bind(this, post._id)}
          type="button"
          className="btn btn-danger mr-1"
        >
          <i className="fas fa-times" />
        </button>
      ) : (
        undefined
      );
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={postAvatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>

            {showActions ? (
              <div>
                <button
                  onClick={this.onClickLike.bind(this, post._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className={this.state.liked} />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>

                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {deleteBtn}
              </div>
            ) : (
              undefined
            )}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, likePost }
)(PostItem);
