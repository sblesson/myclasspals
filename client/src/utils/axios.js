import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const setInterceptors = store => {
  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      console.log(error.response.status);
      if (error.response.status === 401) {
        return (window.location.pathname = '/403');
      } else if (error.response.status === 403) {
        return (window.location.pathname = '/403');
      } else if (error.response.status === 404) {
        return (window.location.pathname = '/404');
      } else if (error.response.status === 500) {
        return (window.location.pathname = '/500');
      }
      return error;
    }
  );
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
