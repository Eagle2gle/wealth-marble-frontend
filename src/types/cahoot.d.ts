type CahootType = {
  id: number;
  title: string;
  location: string;
  status: 'CAHOOTS_CLOSE' | 'CAHOOTS_ONGOING' | 'CAHOOTS_BEFORE';
  stockStart: string;
  stockEnd: string;
  stockPrice: number;
  stockNum: number;
  competitionRate: number;
  images: string[];
  isInterest: boolean;
};

export type CahootListType = {
  result: CahootType[];
};

export type CahootDeadlineType = {
  result: Omit<CahootType, 'location' | 'stockPrice' | 'stockNum' | 'competitionRate'>[];
};
export type CahootDeadlineMiniType = {
  result: Pick<CahootType, 'id' | 'title' | 'competitionRate'>[];
};

export type CahootDetailType = CahootType & {
  themeLocation: string;
  themeBuilding: string;
  expectedMonth: number;
  expectedTotalCost: number;
  shortDescription: string;
  description: string;
  status: string;
  expectedRateOfReturn: number;
  interestCount: number;
  country: string;
};

export type CahootHistoryType = {
  result: {
    time: string;
    stocks: number;
  }[];
};
