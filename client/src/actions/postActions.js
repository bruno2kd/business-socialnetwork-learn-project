import axios from "axios";

import {
  POST_LOADING,
  GET_POSTS,
  GET_POST,
  ADD_POST,
  DELETE_POST,
  GET_ERRORS,
  GET_LIKE,
  CLEAR_ERRORS,
  DELETE_COMMENT
} from "./types";

// Add Create Post
export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Add Create Comment
export const addComment = (post_id, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${post_id}`, commentData)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get All Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

// Get Post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

// Delete post
export const deletePost = post_id => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    axios
      .delete(`/api/posts/${post_id}`)
      .then(res =>
        dispatch({
          type: DELETE_POST,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Delete Comment
export const deleteComment = (postId, commentId) => dispatch => {
  dispatch(clearErrors());
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: DELETE_COMMENT,
        payload: res.data,
        payload2: commentId
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    );
};

// Post Like/Unlike Post
export const likePost = post_id => dispatch => {
  axios
    .post(`/api/posts/like/${post_id}`)
    .then(res =>
      dispatch({
        type: GET_LIKE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set Loading State Post
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
