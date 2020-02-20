import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import leftnav from './leftnav';
import schools from './schools';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  leftnav,
  schools
});
