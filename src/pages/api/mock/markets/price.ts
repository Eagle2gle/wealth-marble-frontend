import type { Response } from '@/types/response';

import type { NextApiRequest, NextApiResponse } from 'next';

const MOCK = Array(5)
  .fill(undefined)
  .map((_, index) => ({
    id: index + 1,
    title: '따뜻한 봄바람이 불어오는 하와이 호텔 건설에 함께하실 마블 분들을 찾아요',
    price: 12400,
    volume: 1235,
    images: [
      'https://wealth-marble-image.s3.ap-northeast-2.amazonaws.com/icon-yellow%20flower.png',
    ],
    diff: 1000 * (index % 2 === 0 ? 1 : -2),
  }));

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<Response<{ updatedAt: string; result: typeof MOCK }>>
) => {
  res.json({
    status: 'success',
    message: null,
    data: { updatedAt: '2023-02-20T16:19:09.238Z', result: MOCK },
  });
};

export const config = {
  api: {
    externalResolver: true,
  },
};

export default handler;
