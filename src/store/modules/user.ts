//store/modules/counter.ts
import { HYDRATE } from 'next-redux-wrapper';

import { createSlice, createAction } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type UserState = {
  id: number | undefined;
  token: string | undefined;
};

const hydrate = createAction<UserState>(HYDRATE);
const initialState: UserState = {
  id: undefined,
  token: undefined,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    logout: (state) => {
      state.token = undefined;
      state.id = undefined;
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

export const { setToken, setId, logout } = userSlice.actions;
export default userSlice;
