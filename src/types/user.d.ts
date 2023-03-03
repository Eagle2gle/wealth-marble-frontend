import { Transactions } from '@/components/mypage/Transactions';
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

export type ParticipatedContestType = {
  result: ContestType[];
};

export type TransactionsType = {
  result: TransactionType[];
}
