import '@/styles/globals.css';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { api } from '@/libs/client/api';
import { logout } from '@/store/modules/user';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { AppProps } from 'next/app';

import wrapper from '../store';

const App = ({ Component, ...rest }: AppProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { suspense: true, useErrorBoundary: true } },
      })
  );
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  useEffect(() => {
    const token = store.getState().user.token;
    if (token) {
      api
        .get('auth/users/me', { headers: { Authorization: `Bearer ${token}` } })
        .catch(() => store.dispatch(logout()));
    }
  }, [store]);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
