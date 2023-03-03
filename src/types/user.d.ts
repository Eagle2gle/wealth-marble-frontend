export type UserInfoType = {
  username: string;
  cash: number;
  value: number;
  email: string;
  providerType: string;
  role: string;
};

export type ContestType = {
  title: string;
  createdAt: string;
  price: number;
  amount: number;
  status: string;
};

export type TransactionType = {
  vacationName: string;
  transactionTime: string;
  price: number;
  amount: number;
  transactionType: string;
};

export type StockType = {
  title: string;
  profitRate: number;
  currentPrice: number;
  pricePerStock: number;
  totalAmount: number;
};

export type ParticipatedContestType = {
  result: ContestType[];
};

export type TransactionsType = {
  result: TransactionType[];
};

export type StocksType = {
  result: StockType[];
}