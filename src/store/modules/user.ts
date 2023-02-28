//store/modules/counter.ts
import { HYDRATE } from 'next-redux-wrapper';

import { createSlice, createAction } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  token: string;
};

const hydrate = createAction<UserState>(HYDRATE);
const initialState: UserState = {
  token: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      console.log('HYDRATE user', action.payload);
      if (!action.payload.token) {
        return state;
      }
      state.token = action.payload.token;
    });
  },
});

export const { setToken } = userSlice.actions;
export default userSlice;
