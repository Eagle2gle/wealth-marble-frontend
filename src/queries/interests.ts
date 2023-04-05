import { api } from '@/libs/client/api';
import type { Interests, Response } from '@/types/response';
import { createMutationKeys, createQueryKeys } from '@lukemorales/query-key-factory';

export const interestsMutations = createMutationKeys('interests', {
  add: (token: string) => ({
    mutationKey: [''],
    mutationFn: (body: { userId: number; vacationId: number }) =>
      api
        .post(`auth/interests`, { json: body, headers: { Authorization: `Bearer ${token}` } })
        .json<Response>(),
  }),
  delete: (token: string) => ({
    mutationKey: [''],
    mutationFn: (body: { userId: number; vacationId: number }) =>
      api
        .delete(`auth/interests`, { json: body, headers: { Authorization: `Bearer ${token}` } })
        .json<Response>(),
  }),
});

export const interests = createQueryKeys('interests', {
  all: {
    queryKey: null,
    queryFn: null,
    contextQueries: {
      type: (type: 'cahoot' | 'market', token: string) => ({
        queryKey: [type],
        queryFn: () =>
          api
            .get(`auth/interests/me?page=0&size=10&type=${type}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
            .json<Response<Interests>>(),
      }),
    },
  },
});
