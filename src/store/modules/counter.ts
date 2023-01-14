//store/modules/counter.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { Appstate } from '..';
export interface CounterState {
  number: number;
}
const initialState: CounterState = {
  number: 0,
};
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.number += 1;
    },
    decrement: (state) => {
      state.number -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.number += action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (!action.payload.counter.number) {
        return state;
      }
      console.log('HYDRATE', action.payload.counter.number);
      state.number = action.payload.counter.number;
    },
  },
});
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const selectCounter = (state: Appstate) => state.counter;
export default counterSlice.reducer;
