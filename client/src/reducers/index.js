import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import school from './school';
import group from './group';
import address from './address';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  school,
  group,
  address
});
