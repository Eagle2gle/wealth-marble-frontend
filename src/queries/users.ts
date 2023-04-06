import { api } from '@/libs/client/api';
import type { Response } from '@/types/response';
import type {
  ParticipatedContestType,
  StocksType,
  TransactionsType,
  UserInfoType,
} from '@/types/user';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const users = createQueryKeys('users', {
  info: (token: string) => ({
    queryKey: [''],
    queryFn: () =>
      api
        .get(`auth/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .json<Response<UserInfoType>>(),
  }),
  contest: (token: string) => ({
    queryKey: [''],
    queryFn: () =>
      api
        .get(`auth/contestParticipation/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .json<Response<ParticipatedContestType>>(),
  }),
  stock: (token: string) => ({
    queryKey: [''],
    queryFn: () =>
      api
        .get(`auth/stocks/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .json<Response<StocksType>>(),
  }),
  transaction: (token: string) => ({
    queryKey: [''],
    queryFn: () =>
      api
        .get(`auth/transactions/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .json<Response<TransactionsType>>(),
  }),
});
