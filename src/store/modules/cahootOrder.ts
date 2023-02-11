//store/modules/counter.ts
import { HYDRATE } from 'next-redux-wrapper';

import { createSlice, createAction } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type CahootOrderState = {
  quantity: number;
};

const hydrate = createAction<CahootOrderState>(HYDRATE);
const initialState: CahootOrderState = {
  quantity: 0,
};
const cahootOrderSlice = createSlice({
  name: 'cahootOrder',
  initialState,
  reducers: {
    increase: (state) => {
      state.quantity += 1;
    },
    decrease: (state) => {
      state.quantity -= 1;
    },
    addByNumber: (state, action: PayloadAction<number>) => {
      state.quantity += action.payload;
    },
    setByNumber: (state, action: PayloadAction<number>) => {
      state.quantity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      console.log('HYDRATE cahoot order', action.payload);
      if (!action.payload.quantity) {
        return state;
      }
      state.quantity = action.payload.quantity;
    });
  },
});

export const { increase, decrease, addByNumber, setByNumber } = cahootOrderSlice.actions;
export default cahootOrderSlice;
