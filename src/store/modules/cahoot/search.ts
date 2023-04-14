import { HYDRATE } from 'next-redux-wrapper';

import { createSlice, createAction } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type CahootSearchState = {
  keyword: string;
};

const hydrate = createAction<CahootSearchState>(HYDRATE);
const initialState: CahootSearchState = {
  keyword: '',
};
const cahootSearchSlice = createSlice({
  name: 'cahootSearch',
  initialState,
  reducers: {
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      console.log('HYDRATE cahoot search', action.payload);
      if (!action.payload.keyword) {
        return state;
      }
      state.keyword = action.payload.keyword;
    });
  },
});

export const { setSearchKeyword } = cahootSearchSlice.actions;
export default cahootSearchSlice;
