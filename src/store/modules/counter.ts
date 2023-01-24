//store/modules/counter.ts
import { HYDRATE } from 'next-redux-wrapper';

import { createSlice, createAction } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Appstate } from '..';

const hydrate = createAction<CounterState>(HYDRATE);

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
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      action.payload;
      if (!action.payload.number) {
        return state;
      }
      console.log('HYDRATE', action.payload.number);
      state.number = action.payload.number;
    });
  },
});
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const selectCounter = (state: Appstate) => state.counter;
export default counterSlice.reducer;
