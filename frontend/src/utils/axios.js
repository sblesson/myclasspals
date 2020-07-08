import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const setInterceptors = store => {
  axios.interceptors.response.use(response => {
    return response;
  });
};

export const setAuthToken = token => {
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
