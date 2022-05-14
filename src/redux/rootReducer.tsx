import { combineReducers } from 'redux';
import { likesReducer } from './likesReducer';
import { inputReducer } from './inputReducer';
import { commReducer } from './commReducer';
import { massfazReducer } from './massfazReducer';

// import { appReducer } from './appReducer';

export const rootReducer = combineReducers({
  likesReducer,
  inputReducer,
  commReducer,
  massfazReducer,
  // appReducer,
});
