import {
  GET_POSTS,
  POST_ERR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_ALERT,
  REMOVE_COMMENT
} from '../actions/types';
//import { stat } from 'fs';
const initialState = {
  post: null,
  posts: [],
  error: {},
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case POST_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: action.payload
        },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state,
          comments: state.post.comments.filter(
            comment => comment._id !== action.payload
          )
        },
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        loading: false,
        post: action.payload
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload.post_id
            ? {
                ...post,
                likes: action.payload.likes
              }
            : post
        ),
        loading: false
      };
    default:
      return state;
  }
}
