import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import navbar from './navbar/reducer';

export default combineReducers({
  auth,
  user,
  navbar,
});
