import type { CahootDeadlineMiniType } from '@/types/cahoot';
import type { Response } from '@/types/response';

import type { NextApiRequest, NextApiResponse } from 'next';

const MOCK = Array(5)
  .fill(undefined)
  .map((_, index) => ({
    id: index + 1,
    title: `따뜻한 봄바람이 불어오는 하와이 호텔과 게스트하우스 ${index + 1}`,
    competitionRate: 200,
  }));

const handler = (req: NextApiRequest, res: NextApiResponse<Response<CahootDeadlineMiniType>>) => {
  res.json({ status: 'success', message: null, data: { result: MOCK } });
};

export const config = {
  api: {
    externalResolver: true,
  },
};

export default handler;
