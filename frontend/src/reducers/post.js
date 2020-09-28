import {
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  ADD_COMMENT_SINGLE_POST,
  REMOVE_COMMENT,
  REMOVE_COMMENT_SINGLE_POST,
  GET_POST_CATEGORIES,
  REMOVE_COMMENT_ERROR,
  SEARCH_POST,
  SEND_PRIVATE_MESSAGE,
  GET_POST_CATEGORIES_ERROR,
  ADD_MESSAGE_REPLY,
  GET_PRIVATE_MESSAGES,
} from '../actions/types';
import CATEGORIES from '../const/CATEGORIES';

const initialState = {
  posts: [],
  messages: [],
  categories: CATEGORIES,
  currentPost: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_POST:
      return {
        ...state,
        posts: payload.post,
        totalPostCount: payload.totalPostCount,
        loading: false,
      };
    case GET_PRIVATE_MESSAGES:
      return {
        ...state,
        messages: payload,
        currentPost: payload[0],
        loading: false,
      };
    case GET_POST_CATEGORIES:
      return {
        ...state,
        categories: CATEGORIES,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        currentPost: payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload.post, ...state.posts],
        loading: false,
      };
    case SEND_PRIVATE_MESSAGE:
      return {
        ...state,
        messages: [payload.post, ...state.messages],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case 'DELETE_MESSAGE':
      return {
        ...state,
        messages: state.messages.filter((message) => message._id !== payload),
        currentPost: null,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId
            ? {
                ...post,
                comments: payload.comments,
              }
            : post
        ),

        loading: false,
      };
    case ADD_MESSAGE_REPLY:
      return {
        ...state,
        messages: state.messages.map((post) =>
          post._id === payload.postId
            ? {
                ...post,
                comments: payload.comments,
              }
            : post
        ),

        loading: false,
      };
    case ADD_COMMENT_SINGLE_POST:
      return {
        ...state,
        currentPost: { ...state.currentPost, comments: payload.comments },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId
            ? {
                ...post,
                comments: post.comments.filter(
                  (comment) => comment._id !== payload.commentId
                ),
              }
            : post
        ),
        loading: false,
      };

    case REMOVE_COMMENT_SINGLE_POST:
      return {
        ...state,
        currentPost: {
          ...state.currentPost,
          comments: state.currentPost.comments.filter(
            (comment) => comment._id !== payload.commentId
          ),
        },
        loading: false,
      };

    case REMOVE_COMMENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case GET_POST_CATEGORIES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
