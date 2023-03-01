import wrapper from '@/store';
import { setId, setToken } from '@/store/modules/user';

const Redirect = () => {
  return <></>;
};

export const getServerSideProps = wrapper.getServerSideProps((state) => async (context) => {
  const { token } = context.query;
  if (typeof token !== 'string' || !token) return { notFound: true };
  try {
    const jwtPayload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    state.dispatch(setToken(token));
    state.dispatch(setId(jwtPayload.id));
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  } catch (e) {
    console.error(e);
    return {
      notFound: true,
    };
  }
});

export default Redirect;
