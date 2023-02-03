type CahootType = {
  id: number;
  title: string;
  location: string;
  status: string;
  stockStart: string;
  stockEnd: string;
  stockPrice: number;
  stockNum: number;
  competitionRate: number;
  images: string[];
};

export type CahootListType = {
  result: CahootType[];
};

export type CahootDeadlineType = {
  result: Omit<CahootType, 'location' | 'stockPrice' | 'stockNum' | 'competitionRate'>[];
};

export type CahootDetailType = CahootType & {
  themeLocation: string;
  themeBuilding: string;
  expectedMonth: number;
  expectedTotalCost: number;
  shortDescription: string;
  descritption: string;
  status: string;
  expectedRateOfReturn: number;
};

export type CahootHistoryType = {
  result: {
    time: string;
    stocks: number;
  }[];
};
