import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import cahootSearchSlice from './cahoot/search';
import cahootOrderSlice from './cahootOrder';
import marketOrderSlice from './marketOrder';
import userSlice from './user';

const combinedReducer = combineReducers({
  [cahootOrderSlice.name]: cahootOrderSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [marketOrderSlice.name]: marketOrderSlice.reducer,
  [cahootSearchSlice.name]: cahootSearchSlice.reducer,
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
