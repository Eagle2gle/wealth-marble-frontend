import kyUniversal from 'ky-universal';

export const api = kyUniversal.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_HOST}/api`,
});
