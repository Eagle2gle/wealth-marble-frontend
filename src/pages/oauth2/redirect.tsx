import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useTypeDispatch } from '@/store';
import { setId, setToken } from '@/store/modules/user';

import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';

const Redirect = ({ token, id }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useTypeDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(setToken(token));
    dispatch(setId(id));
    router.replace('/');
  }, [dispatch, router, token, id]);

  return <></>;
};

export const getServerSideProps: GetServerSideProps<{ token: string; id: number }> = async (
  context
) => {
  const { token } = context.query;
  if (typeof token !== 'string' || !token) return { notFound: true };
  try {
    const jwtPayload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    return {
      props: {
        token,
        id: jwtPayload.id,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
};

export default Redirect;
