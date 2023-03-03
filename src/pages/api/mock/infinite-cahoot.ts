import type { CahootListType, CahootType } from '@/types/cahoot';
import type { Response } from '@/types/response';

import type { NextApiRequest, NextApiResponse } from 'next';

const MOCK_DATA: CahootType[] = Array(40)
  .fill(undefined)
  .map((_, index) => ({
    id: index + 1,
    title: '훈이네 민박 ',
    location: '경기도 가',
    status: 'CAHOOTS_ONGOING',
    stockStart: '2023-01-23',
    stockEnd: '2024-03-01',
    stockPrice: 10000,
    stockNum: 20,
    competitionRate: 40,
    images: ['https://wealth-marble-image.s3.ap-northeast-2.amazonaws.com/icon-cup.png'],
    isInterest: false,
  }));

const handler = (req: NextApiRequest, res: NextApiResponse<Response<CahootListType>>) => {
  const { offset } = req.query;
  if (offset === '0') {
    return res.json({
      status: 'success',
      message: null,
      data: {
        result: MOCK_DATA.slice(0, 10),
      },
    });
  } else if (offset === '1') {
    return res.json({
      status: 'success',
      message: null,
      data: {
        result: MOCK_DATA.slice(10, 20),
      },
    });
  } else if (offset === '2') {
    return res.json({
      status: 'success',
      message: null,
      data: {
        result: MOCK_DATA.slice(20, 30),
      },
    });
  } else if (offset === '3') {
    return res.json({
      status: 'success',
      message: null,
      data: {
        result: MOCK_DATA.slice(30, 40),
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
