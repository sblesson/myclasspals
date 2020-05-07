import {
  GET_POSTS,
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
  SEARCH_POST_BY_GROUP_ID,
  SEARCH_POST,
  SEND_PRIVATE_MESSAGE,
  GET_POST_CATEGORIES_ERROR
} from '../actions/types';

const initialState = {
  posts: [],
  categories: [],
  currentPost: null,
  loading: true,
  error: {}
};

const categories = [
  'divider',

  {
    category_id: 0,
    title: 'General',
    url: '/general/'
  },
  {
    category_id: 1,
    title: 'Recommendations',
    url: '/recommendations/'
  },
  {
    category_id: 2,
    title: 'Lost & Found',
    url: '/lostfound/'
  },
  {
    category_id: 3,
    title: 'Reminder',
    url: '/reminder/'
  },
  {
    category_id: 4,
    title: 'Carpool',
    url: '/carpool/'
  },
  {
    category_id: 5,
    title: 'About Homework',
    url: '/homework/'
  },
  {
    category_id: 6,
    title: 'Needed Help',
    url: '/needhelp/'
  },
  {
    category_id: 7,
    title: 'Aftercare',
    url: '/aftercare/'
  },
  'divider',

  {
    category_id: 8,
    title: 'Birthday',
    url: '/birthday/'
  },
  {
    category_id: 9,
    title: 'Playdate',
    url: '/playdate/'
  },
  {
    category_id: 10,
    title: 'Fieldtrips or Camps',
    url: '/fieldtrips/'
  },
  {
    category_id: 11,
    title: 'Volunteering',
    url: '/volunteering/'
  },
  {
    category_id: 12,
    title: 'Urgent',
    url: '/urgent/'
  }
];

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case SEARCH_POST_BY_GROUP_ID:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case SEARCH_POST:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case GET_POST_CATEGORIES:
      return {
        ...state,
        categories: categories,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        currentPost: payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload.post, ...state.posts],
        loading: false
      };
    case SEND_PRIVATE_MESSAGE:
      return {
        ...state,
        posts: [payload.post, ...state.posts],
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.postId
            ? {
                ...post,
                comments: payload.comments
              }
            : post
        ),

        loading: false
      };
    case ADD_COMMENT_SINGLE_POST:
      return {
        ...state,
        currentPost: { ...state.post, comments: payload.comments },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.postId
            ? {
                ...post,
                comments: post.comments.filter(
                  comment => comment._id !== payload.commentId
                )
              }
            : post
        ),
        loading: false
      };

    case REMOVE_COMMENT_SINGLE_POST:
      return {
        ...state,
        currentPost: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment._id !== payload.commentId
          )
        },
        loading: false
      };

    case REMOVE_COMMENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };

    case GET_POST_CATEGORIES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
