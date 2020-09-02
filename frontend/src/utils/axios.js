import axios from 'axios';

const { REACT_APP_BACKEND_URL, REACT_APP_STAGE } = process.env;
console.log(process.env);
let url;
/* if (REACT_APP_STAGE === 'dev') {
  axios.defaults.baseURL = 'http://localhost:8080';
}

if (REACT_APP_STAGE === 'prod') {
  axios.defaults.baseURL = REACT_APP_BACKEND_URL;
} */
axios.defaults.baseURL = 'http://localhost:8080';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const setInterceptors = (store) => {
  axios.interceptors.response.use((response) => {
    return response;
  });
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
