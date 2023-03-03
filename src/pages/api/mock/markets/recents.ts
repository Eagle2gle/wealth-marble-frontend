import type { Response } from '@/types/response';

import type { NextApiRequest, NextApiResponse } from 'next';

const MOCK = Array(6)
  .fill(undefined)
  .map((_, index) => ({
    id: index + 1,
    title: '따뜻한 봄바람이 불어오는 하와이 호텔과 게스트하우스',
    price: 12400,
    volume: 1235,
    images: [
      'https://wealth-marble-image.s3.ap-northeast-2.amazonaws.com/icon-yellow%20flower.png',
    ],
    time: '2023-01-20T23:15:53.026633',
    diff: 1000 * (Math.random() < 0.5 ? 1 : -2),
    amount: 1,
  }));

const handler = (req: NextApiRequest, res: NextApiResponse<Response<typeof MOCK>>) => {
  res.json({ status: 'success', message: null, data: MOCK });
};

export const config = {
  api: {
    externalResolver: true,
  },
};

export default handler;
