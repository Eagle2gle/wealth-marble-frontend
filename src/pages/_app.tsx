import '@/styles/globals.css';
import { wrapper } from '../store';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);
