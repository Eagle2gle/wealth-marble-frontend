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
