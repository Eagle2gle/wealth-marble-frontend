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

export type MarketInfoType = {
  vacationId: number;
  title: string;
  location: string;
  description: string;
  pictures: string[];
}

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

export type Top5ItemType = {
  vacationId: number;
  pictureUrl: string;
  title: string;
  currentPrice: number;
  gap: number;
  gapRate: number;
  dividend: number;
  dividendRate: number;
};

export type Top5ListType = {
  result: Top5ItemType[];
};

export type MarketOrder = {
  marketId: number;
  price: number;
  amount: number;
  orderType: 'SELL' | 'BUY';
};

export type MarketOrderList = {
  result: Omit<MarketOrder, 'marketId'>[];
};

export type MarketTransactionHistory = {
  result: {
    date: 'string';
    price: number;
    amount: number;
  }[];
};
