import {
  ADD_POST,
  POST_LOADING,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  GET_LIKE,
  DELETE_COMMENT
} from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };
    case GET_LIKE:
      const index = state.posts.findIndex(x => x._id === action.payload._id);
      state.posts[index] = action.payload;
      return {
        ...state,
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload.post_id),
        loading: false
      };
    case DELETE_COMMENT:
      state.post.comments = state.post.comments.filter(
        c => c._id !== action.payload2
      );
      return {
        ...state,
        // post: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
