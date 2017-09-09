import { combineReducers } from 'redux';

import flashMessages from './reducers/flashMessages';
import auth from './reducers/auth';
import games from './reducers/games';

export default combineReducers({
  flashMessages,
  auth,
  games
});
