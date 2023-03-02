import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

import { nextReduxCookieMiddleware, wrapMakeStore } from 'next-redux-cookie-wrapper';
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';

import { configureStore } from '@reduxjs/toolkit';
import type { ThunkAction } from '@reduxjs/toolkit';

import rootReducer from './modules';

import type { Action } from 'redux';

const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(
          nextReduxCookieMiddleware({
            subtrees: ['user'],
            sameSite: 'lax',
            maxAge: 60 * 60,
          })
        )
        .concat(logger),
    devTools: process.env.NODE_ENV === 'development',
  })
);

const wrapper = createWrapper(makeStore);

type AppStore = ReturnType<typeof makeStore>;
type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;

export const useTypeDispatch = () => useDispatch<AppDispatch>();
export const useTypeSelector: TypedUseSelectorHook<RootState> = useSelector;

export default wrapper;
