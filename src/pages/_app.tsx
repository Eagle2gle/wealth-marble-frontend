import '@/styles/globals.css';

import { Provider } from 'react-redux';


import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import type { AppProps } from 'next/app';

import wrapper from '../store';

const queryClient = new QueryClient({
  defaultOptions: { queries: { suspense: true, useErrorBoundary: true } },
});

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
