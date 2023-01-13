import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { Context, createWrapper } from 'next-redux-wrapper';
import counterReducer from './modules/counter';
import logger from 'redux-logger';
import { Action } from 'redux';

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
