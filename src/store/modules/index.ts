import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import cahootOrderSlice from './cahootOrder';
import userSlice from './user';

const combinedReducer = combineReducers({
  [cahootOrderSlice.name]: cahootOrderSlice.reducer,
  [userSlice.name]: userSlice.reducer,
});

const rootReducer: typeof combinedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export default rootReducer;
