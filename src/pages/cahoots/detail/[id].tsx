import Error from 'next/error';

import DetailBody from '@/components/cahoot/DetailBody';
import DetailHeader from '@/components/cahoot/DetailHeader';
import OrderMobile from '@/components/cahoot/OrderMobile';
import Layout from '@/components/common/Layout';
import { api } from '@/libs/client/api';
import wrapper from '@/store';
import { ServerError } from '@/types/response';

import type { InferGetServerSidePropsType, NextPage } from 'next';

import { dehydrate, QueryClient } from '@tanstack/react-query';

const CahootsDetail: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  error,
}) => {
  if (error) return <Error statusCode={error.statusCode} title={error.title} />;

  return (
    <Layout>
      <div className="mb-60 flex flex-col gap-6 md:mb-0">
        <DetailHeader />
        <DetailBody />
        <OrderMobile />
      </div>
    </Layout>
  );
};

type CahootsDetailProps = {
  error: ServerError;
};

export const getServerSideProps = wrapper.getServerSideProps<CahootsDetailProps>(
  () => async (context) => {
    const { id } = context.query;
    if (typeof id !== 'string' || !parseInt(id)) return { notFound: true };
    const queryClient = new QueryClient();
    const promises: Promise<unknown>[] = [
      queryClient.fetchQuery(['cahoot/detail', id], () =>
        api.get(`cahoots/${id}?info=detail`).json()
      ),
      queryClient.fetchQuery(['cahoot/history', id], () =>
        api.get(`cahoots/${id}?info=history`).json()
      ),
    ];

    try {
      await Promise.all(promises);
    } catch (e) {
      console.error(e);
      const error = {
        statusCode: 500,
        title: 'Internal Server Error',
      };
      return {
        props: { error },
      };
    }

    return {
      props: {
        error: false,
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
);

export default CahootsDetail;
