import axios from 'axios';
import {
  GET_POSTS,
  POST_ERR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from './types';
import { setAlert } from './alert';

//Get Posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('http://localhost:5000/api/post');

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//Get Post
export const getPost = post_id => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:5000/api/post/${post_id}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//Add Like
export const addLike = post_id => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/post/like/${post_id}`
    );

    dispatch({
      type: UPDATE_LIKES,
      payload: { post_id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//Remove Like
export const removeLike = post_id => async dispatch => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/post/unlike/${post_id}`
    );

    dispatch({
      type: UPDATE_LIKES,
      payload: { post_id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//Remove Like
export const deletePost = post_id => async dispatch => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/post/${post_id}`);

    dispatch({
      type: DELETE_POST,
      payload: post_id
    });

    dispatch(setAlert('Post Removed ', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//Add Post
export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post(
      `http://localhost:5000/api/post`,
      formData,
      config
    );

    dispatch({
      type: ADD_POST,
      payload: res.data
    });
    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//Add Comment
export const addComment = (post_id, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.put(
      `http://localhost:5000/api/post/comment/${post_id}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });
    dispatch(setAlert('Comment Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

//Remove Comment
export const deleteComment = (post_id, comment_id) => async dispatch => {
  try {
    const res = await axios.delete(
      `http://localhost:5000/api/post/comment/${post_id}/${comment_id}`
    );

    dispatch({
      type: REMOVE_COMMENT,
      payload: comment_id
    });
    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};
