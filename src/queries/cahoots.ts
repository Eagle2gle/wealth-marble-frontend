import { api } from '@/libs/client/api';
import type {
  CahootDeadlineMiniType,
  CahootDeadlineType,
  CahootDetailType,
  CahootHistoryType,
  CahootListType,
  RecentCahootListType,
} from '@/types/cahoot';
import type { Response } from '@/types/response';
import { createQueryKeys, createMutationKeys } from '@lukemorales/query-key-factory';

export const cahoots = createQueryKeys('cahoots', {
  detail: (id: string, userId: number | '') => ({
    queryKey: [id, userId],
    queryFn: () =>
      api.get(`cahoots/${id}?info=detail&userId=${userId}`).json<Response<CahootDetailType>>(),
  }),
  deadline: {
    queryKey: null,
    queryFn: () => api.get(`cahoots?status=ending-soon`).json<Response<CahootDeadlineType>>(),
    contextQueries: {
      mini: {
        queryKey: null,
        queryFn: () =>
          api.get(`cahoots/mini?status=ending-soon`).json<Response<CahootDeadlineMiniType>>(),
      },
    },
  },
  history: (id: string) => ({
    queryKey: [id],
    queryFn: () => api.get(`cahoots/${id}?info=history`).json<Response<CahootHistoryType>>(),
  }),
  recap: {
    queryKey: null,
    queryFn: () => api.get(`cahoots?status=ended`).json<Response<CahootListType>>(),
  },
  list: (keyword: string, userId: number | '') => ({
    queryKey: [keyword, userId],
    queryFn: ({ pageParam = 0 }) =>
      api
        .get(
          `cahoots?status=ongoing&page=${pageParam ?? 0}&keyword=${encodeURIComponent(
            keyword
          )}&userId=${userId ?? ''}`
        )
        .json<Response<CahootListType>>(),
  }),
  recent: {
    queryKey: null,
    queryFn: () => api.get('cahoots/recent').json<Response<RecentCahootListType>>(),
  },
});

export const cahootsMutations = createMutationKeys('cahoots', {
  buy: (id: string, token: string) => ({
    mutationKey: [id],
    mutationFn: (data: { stocks: number }) =>
      api
        .post(`auth/cahoots/${id}`, {
          json: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .json<Response>(),
  }),
});
