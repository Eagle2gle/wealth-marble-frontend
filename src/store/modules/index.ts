import { HYDRATE } from 'next-redux-wrapper';

import { combineReducers } from '@reduxjs/toolkit';
import type { AnyAction } from '@reduxjs/toolkit';

import counter, { CounterState } from './counter';

const reducer = (state: CounterState = { number: 0 }, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combineReducers({
    counter,
  });
};
export default reducer;
