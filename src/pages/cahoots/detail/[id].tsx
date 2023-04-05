import Error from 'next/error';

import DetailBody from '@/components/cahoot/DetailBody';
import DetailHeader from '@/components/cahoot/DetailHeader';
import OrderMobile from '@/components/cahoot/OrderMobile';
import Layout from '@/components/common/Layout';
import type { NextPageWithLayout } from '@/pages/_app';
import { queries } from '@/queries';
import wrapper from '@/store';
import { ServerError } from '@/types/response';

import type { InferGetServerSidePropsType } from 'next';

import { dehydrate, QueryClient } from '@tanstack/react-query';

const CahootsDetail: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  error,
}) => {
  if (error) return <Error statusCode={error.statusCode} title={error.title} />;

  return (
    <div className="mb-60 flex flex-col gap-6 md:mb-0">
      <DetailHeader />
      <DetailBody />
      <OrderMobile />
    </div>
  );
};

CahootsDetail.getLayout = (page) => <Layout>{page}</Layout>;

type CahootsDetailProps = {
  error: ServerError;
};

export const getServerSideProps = wrapper.getServerSideProps<CahootsDetailProps>(
  () => async (context) => {
    const { id } = context.query;
    if (typeof id !== 'string' || !parseInt(id)) return { notFound: true };
    const queryClient = new QueryClient();
    const promises: Promise<unknown>[] = [
      queryClient.fetchQuery(queries.cahoots.detail(id)),
      queryClient.fetchQuery(queries.cahoots.history(id)),
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
