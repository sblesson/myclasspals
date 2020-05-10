import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import leftnav from './leftnav';
import school from './school';
import group from './group';
import address from './address';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  leftnav,
  school,
  group,
  address
});
