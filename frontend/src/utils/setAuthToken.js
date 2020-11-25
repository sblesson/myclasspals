import api from './api';

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = 'Bearer ' + token;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};

export const CancelToken = api.CancelToken;
