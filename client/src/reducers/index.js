import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import school from './school';
import group from './group';
import address from './address';
import { DESTROY_SESSION } from '../actions/types';

const appReducer = combineReducers({
  alert,
  auth,
  profile,
  post,
  school,
  group,
  address
});

const rootReducer = (state, action) => {
  if (action.type === DESTROY_SESSION) state = undefined;

  return appReducer(state, action);
};

export default rootReducer;
