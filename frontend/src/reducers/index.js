import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import school from './school';
import group from './group';
import address from './address';
import { DESTROY_SESSION } from '../actions/types';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['alert', 'auth', 'profile', 'post', 'school', 'group', 'address']
};

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
  if (action.type === DESTROY_SESSION) {
    // for all keys defined in your persistConfig(s)
    storage.removeItem('persist:root');

    state = undefined;
  }

  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
