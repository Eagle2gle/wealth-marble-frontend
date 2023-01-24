import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';

import { configureStore } from '@reduxjs/toolkit';
import type { ThunkAction } from '@reduxjs/toolkit';

import type { Context } from 'next-redux-wrapper';

import counterReducer from './modules/counter';

import type { Action } from 'redux';

const makeStore = (context: Context) =>
  configureStore({
    reducer: {
      counter: counterReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: true,
  });

export type Appstore = ReturnType<typeof makeStore>;
export type Appstate = ReturnType<Appstore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, Appstate, unknown, Action>;

export const wrapper = createWrapper<Appstore>(makeStore);
