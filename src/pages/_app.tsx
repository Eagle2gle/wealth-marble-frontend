import '@/styles/globals.css';

import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { api } from '@/libs/client/api';
import { logout } from '@/store/modules/user';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import wrapper from '../store';

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, ...rest }: AppPropsWithLayout) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { suspense: true, useErrorBoundary: true } },
      })
  );
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

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
          {getLayout(<Component {...pageProps} />)}
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
