import axios from 'axios';
import { setAlert, catchHandler } from './alert';
import {
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
  SEARCH_POST,
  GET_PRIVATE_MESSAGES,
  GET_POST_CATEGORIES_ERROR,
  ADD_MESSAGE_REPLY,
} from './types';
import { CancelToken } from '../utils/axios';

// Get posts
export const getPostCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_POST_CATEGORIES,
      payload: { screen: 'dash' },
    });
  } catch (err) {
    catchHandler(err, GET_POST_CATEGORIES_ERROR);
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/post/createpost', formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert('Post created', 'success'));
  } catch (err) {
    catchHandler(err, 'ADD_POST_ERROR');
  }
};

// Search post by groupId
export const searchPost = (requestObj, callback) => async (dispatch) => {
  let cancel;
  console.log(requestObj);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/post/searchpost', requestObj, config, {
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    });
    dispatch({
      type: SEARCH_POST,
      payload: res.data,
    });
    console.log(res.data);
    callback(res.data.post, cancel);
  } catch (err) {
    if (axios.isCancel(err)) return;
    catchHandler(err, 'SEARCH_POST_ERROR');
  }
};

// Search post by groupId
export const getPrivateMessages = (formData, callback) => async (dispatch) => {
  let cancelTokenSrc = axios.CancelToken.source();

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/post/searchpost', formData, config, {
      cancelToken: cancelTokenSrc.token,
    });
    dispatch({
      type: GET_PRIVATE_MESSAGES,
      payload: res.data.post,
    });
  } catch (err) {
    catchHandler(err, 'CREATE_PRIVATE_POST_ERROR');
  }
  callback(cancelTokenSrc);
};
// Add post
export const sendPrivateMessage = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/post/createpost', formData, config);

    dispatch({
      type: SEND_PRIVATE_MESSAGE,
      payload: res.data,
    });

    dispatch(setAlert('New Message Created', 'success'));
  } catch (err) {
    catchHandler(err, 'CREATE_POST_ERROR');
  }
};

// Search post by postId
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/post/getpost?id=${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data.post,
    });
  } catch (err) {
    catchHandler(err, 'GET_POST_ERROR');
  }
};

// Add comment
export const addMessageReply = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `/post/${postId}/addcomment`,
      formData,
      config
    );

    dispatch({
      type: ADD_MESSAGE_REPLY,
      payload: { postId, comments: res.data.post.comments },
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    catchHandler(err, 'ADD_MESSAGE_REPLY_ERROR');
  }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `/post/${postId}/addcomment`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: { postId, comments: res.data.post.comments },
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    catchHandler(err, 'ADD_COMMENT_ERROR');
  }
};

// Add comment
export const addCommentToSinglePost = (postId, formData) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `/post/${postId}/addcomment`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT_SINGLE_POST,
      payload: { postId, comments: res.data.post.comments },
    });

    dispatch(setAlert('Comment Added', 'success'));
  } catch (err) {
    catchHandler(err, 'ADD_COMMENT_SINGLE_POST_ERROR');
  }
};
// Delete post
export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/post/deletepost/${postId}`);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
  } catch (err) {
    catchHandler(err, 'DELETE_POST_ERROR');
  }
};

// Delete post
export const deleteMessage = (postId,callback) => async (dispatch) => {
  try {
    const res = await axios.delete(`/post/deletepost/${postId}`);
    dispatch({
      type: 'DELETE_MESSAGE',
      payload: postId,
    });
  } catch (err) {
    catchHandler(err, 'DELETE_POST_ERROR');
  }
  callback();
};

// Delete comment
export const deleteComment = (postId, commentId, isSinglePost) => async (
  dispatch
) => {
  try {
    const res = await axios.delete(`/post/deletepost/${commentId}`);
    if (isSinglePost) {
      dispatch({
        type: REMOVE_COMMENT_SINGLE_POST,
        payload: { postId, commentId, comments: res.data },
      });
    } else {
      dispatch({
        type: REMOVE_COMMENT,
        payload: { postId, commentId, comments: res.data },
      });
    }
    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    catchHandler(err, 'DELETE_POST_ERROR');
  }
};
