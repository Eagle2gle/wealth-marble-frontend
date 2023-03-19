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

export type MarketPriceInfoOrder = 'up' | 'down';
export type MarketPriceInfoType = 'PRICE' | 'PRICE_RATE';

export type MarketPriceInfo = {
  result: {
    pictureUrl: string;
    title: string;
    currentPrice: number;
    gap: number;
    gapRate: number;
    dividend: number;
    dividendRate: number;
  }[];
};

export type RecommendedItemType = {
  id: number;
  title: string;
  expectedRateOfReturn: number;
  image: string;
  isInterest: boolean;
};

export type RecommendedListType = {
  result: RecommendedItemType[];
};
