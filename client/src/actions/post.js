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
  SEARCH_POST,
  GET_POST_CATEGORIES_ERROR
} from './types';

// Get posts
export const getPostCategories = () => async dispatch => {
  try {
    dispatch({
      type: GET_POST_CATEGORIES,
      payload: { screen: 'dash' }
    });
  } catch (err) {
    dispatch({
      type: GET_POST_CATEGORIES_ERROR,
      payload: { msg: err, status: err }
      //payload: { msg: err.response.statusText, status: err.response.status } //todo change error message
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
    const res = await axios.post('/post/createpost', formData, config);
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
export const searchPost = groupId => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const formData = { groupId: groupId };

  try {
    const res = await axios.post('/post/searchpost', formData, config);
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

// Search post by groupId
export const getPrivateMessages = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/post/searchpost', formData, config);
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
    const res = await axios.post('/post/createpost', formData, config);

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

// Search post by postId
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/post/getpost?id=${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data.post
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addMessageReply = (postId, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      `/post/${postId}/addcomment`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: { postId, comments: res.data.post.comments }
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
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
      `/post/${postId}/addcomment`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: { postId, comments: res.data.post.comments }
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
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
      `/post/${postId}/addcomment`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT_SINGLE_POST,
      payload: { postId, comments: res.data.post.comments }
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
// Delete post
export const deletePost = postId => async dispatch => {
  try {
    const res = await axios.delete(`/post/deletepost/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (
  postId,
  commentId,
  isSinglePost
) => async dispatch => {
  try {
    const res = await axios.delete(`/post/deletepost/${commentId}`);
    if (isSinglePost) {
      dispatch({
        type: REMOVE_COMMENT_SINGLE_POST,
        payload: { postId, commentId, comments: res.data }
      });
    } else {
      dispatch({
        type: REMOVE_COMMENT,
        payload: { postId, commentId, comments: res.data }
      });
    }
    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
