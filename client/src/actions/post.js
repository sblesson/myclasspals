import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  GET_POST_CATEGORIES,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  ADD_COMMENT_SINGLE_POST,
  REMOVE_COMMENT_SINGLE_POST,
  REMOVE_COMMENT_ERROR,
  SEND_PRIVATE_MESSAGE,
  SEARCH_POST_BY_GROUP_ID,
  SEARCH_POST
} from './types';

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get posts
export const getPostCategories = () => async dispatch => {
  try {
    const res = await axios.get('/api/categories');

    dispatch({
      type: GET_POST_CATEGORIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err, status: err } //todo change error message
    });
  }
};

// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete post
export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add post
export const addPost = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      'http://localhost:8080/post/createpost',
      formData,
      config
    );

    console.log(res);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Search post by groupId
export const searchPostByGroupId = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      'http://localhost:8080/post/searchpost',
      formData,
      config
    );

    console.log(res);

    dispatch({
      type: SEARCH_POST_BY_GROUP_ID,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Search post by groupId
export const searchPost = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      'http://localhost:8080/post/searchpost',
      formData,
      config
    );

    console.log(res);

    dispatch({
      type: SEARCH_POST,
      payload: res.data.post
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Add post
export const sendPrivateMessage = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      'http://localhost:8080/post/createpost',
      formData,
      config
    );

    dispatch({
      type: SEND_PRIVATE_MESSAGE,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get post
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: { postId, comments: res.data }
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addCommentToSinglePost = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT_SINGLE_POST,
      payload: { postId, comments: res.data }
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: { postId, commentId, comments: res.data }
    });

    dispatch(setAlert('Comment Removed', 'success'));
    console.log(commentId);
  } catch (err) {
    console.log(err);
    dispatch({
      type: REMOVE_COMMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteSinglePostComment = (
  postId,
  commentId
) => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT_SINGLE_POST,
      payload: { postId, commentId, comments: res.data }
    });

    dispatch(setAlert('Comment Removed', 'success'));
    console.log(commentId);
  } catch (err) {
    console.log(err);
    dispatch({
      type: REMOVE_COMMENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
