import '@/styles/globals.css';
import BottomBar from '@/components/common/BottomBar';
import Header from '@/components/common/Header';

import { wrapper } from '../store';

import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <div className="py-16 md:py-0 md:pt-16 max-w-3xl mx-auto">
        <Component {...pageProps} />
      </div>
      <BottomBar />
    </>
  );
}

export default wrapper.withRedux(App);
