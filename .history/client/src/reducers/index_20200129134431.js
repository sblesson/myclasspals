import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import leftnav from './leftnav';
import modal from ''

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  leftnav
});
