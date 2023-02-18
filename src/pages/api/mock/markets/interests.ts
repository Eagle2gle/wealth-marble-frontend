import type { Response } from '@/types/response';

import type { NextApiRequest, NextApiResponse } from 'next';

const MOCK = Array(10)
  .fill(undefined)
  .map((_, index) => ({
    id: index + 1,
    title: '따뜻한 봄바람이 불어오는 하와이 호텔과 게스트하우스',
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
