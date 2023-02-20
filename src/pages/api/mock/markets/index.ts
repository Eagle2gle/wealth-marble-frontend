import type { Response } from '@/types/response';

import type { NextApiRequest, NextApiResponse } from 'next';

const MOCK = Array(40)
  .fill(undefined)
  .map((_, index) => ({
    id: index + 1,
    title: '따뜻한 봄바람이 불어오는 하와이 호텔 건설에 함께하실 마블 분들을 찾아요',
    location: '대한민국',
    price: 12400,
    diff: 1000 * (Math.random() < 0.5 ? 1 : -2),
    images: ['https://wealth-marble-image.s3.ap-northeast-2.amazonaws.com/icon-cup.png'],
  }));

const handler = (req: NextApiRequest, res: NextApiResponse<Response<{ result: typeof MOCK }>>) => {
  const { page } = req.query;
  if (page === '0') {
    return res.json({
      status: 'success',
      message: null,
      data: {
        result: MOCK.slice(0, 10),
      },
    });
  } else if (page === '1') {
    return res.json({
      status: 'success',
      message: null,
      data: {
        result: MOCK.slice(10, 20),
      },
    });
  } else if (page === '2') {
    return res.json({
      status: 'success',
      message: null,
      data: {
        result: MOCK.slice(20, 30),
      },
    });
  } else if (page === '3') {
    return res.json({
      status: 'success',
      message: null,
      data: {
        result: MOCK.slice(30, 40),
      },
    });
  }
  res.status(404).json({ status: 'fail', message: 'No data', data: { result: [] } });
};

export const config = {
  api: {
    externalResolver: true,
  },
};

export default handler;
