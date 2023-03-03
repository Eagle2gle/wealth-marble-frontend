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

export type ParticipatedContestType = {
  result: ContestType[];
};
