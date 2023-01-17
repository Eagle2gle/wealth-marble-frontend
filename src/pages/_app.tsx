import '@/styles/globals.css';
import BottomBar from '@/components/common/BottomBar';
import Header from '@/components/common/Header';

import { wrapper } from '../store';

import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <BottomBar />
    </>
  );
}

export default wrapper.withRedux(App);
