import axios from 'axios';
import store from '../store';
import { LOGOUT } from '../actions/types';

const { REACT_APP_BACKEND_URL, REACT_APP_STAGE } = process.env;
let url;
/* if (REACT_APP_STAGE === 'dev') {
  axios.defaults.baseURL = 'http://localhost:8080/api';
}

if (REACT_APP_STAGE === 'prod') {
  axios.defaults.baseURL = '/api';
} */

axios.defaults.baseURL = 'http://localhost:8080/api';
//#TODO for prod
//axios.defaults.baseURL = '/api';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const setInterceptors = (store) => {
  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response.status === 401) {
        store.dispatch({ type: LOGOUT });
      }
      return Promise.reject(err);
    }
  );
};

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    axios.defaults.headers.common['Access-Control-Allow-Headers'] =
      'Origin, X-Requested-With, Content-Type, Accept, Authorization';

    axios.defaults.headers.common['x-auth-token'] = 'Bearer ' + token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const CancelToken = axios.CancelToken;
