export type MarketType = {
  vacationId: number;
  picture: string | null;
  country: string;
  shortDescription: string;
  price: number;
  priceStatus: 'DOWN' | 'UP' | 'SAME';
};

export type MarketListType = {
  result: MarketType[];
};

export type MarketDetailType = Omit<MarketType, 'picture' | 'country' | 'priceStatus'> & {
  title: string;
  location: string;
  expectedRateOfReturn: number;
  pictures: string[];
  userIds: number[];
};
