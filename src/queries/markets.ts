import type { Criteria } from '@/components/home/TopFiveList/types';
import { api } from '@/libs/client/api';
import { CountriesType } from '@/types/cahoot';
import type {
  MarketDetailType,
  MarketListType,
  MarketOrderList,
  MarketPriceInfo,
  MarketPriceInfoOrder,
  MarketPriceInfoType,
  MarketTransactionHistory,
  RecommendedListType,
  Top5ListType,
} from '@/types/market';
import type { Response } from '@/types/response';
import { createQueryKeys } from '@lukemorales/query-key-factory';

export const markets = createQueryKeys('markets', {
  list: {
    queryKey: null,
    queryFn: null,
    contextQueries: {
      keyword: (keyword: string) => ({
        queryKey: [keyword],
        queryFn: ({ pageParam = 0 }) =>
          api
            .get(`markets?page=${pageParam ?? 0}&keyword=${encodeURIComponent(keyword)}&size=10`)
            .json<Response<MarketListType>>(),
      }),
    },
  },
  detail: (id: string) => ({
    queryKey: [id],
    queryFn: () => api.get(`markets/${id}`).json<Response<MarketDetailType>>(),
  }),
  trade: (id: string) => ({
    queryKey: [id],
    queryFn: () => api.get(`orders/${id}/list`).json<Response<MarketOrderList>>(),
  }),
  transaction: {
    queryKey: null,
    queryFn: null,
    contextQueries: {
      history: (id: string) => ({
        queryKey: [id],
        queryFn: null,
        contextQueries: {
          week: (weekStart: string, weekEnd: string) => ({
            queryKey: [weekStart, weekEnd],
            queryFn: () =>
              api
                .get(`transactions/${id}?page=0&startDate=${weekStart}&endDate=${weekEnd}`)
                .json<Response<MarketTransactionHistory>>(),
          }),
        },
      }),
    },
  },
  price: ({ type, order }: { type: MarketPriceInfoType; order: MarketPriceInfoOrder }) => ({
    queryKey: [type, order],
    queryFn: () =>
      api.get(`markets/rank?type=${type}&${order}=TRUE`).json<Response<MarketPriceInfo>>(),
  }),
  countries: {
    queryKey: null,
    queryFn: () => api.get('markets/countries').json<Response<CountriesType>>(),
  },
  recommend: {
    queryKey: null,
    queryFn: null,
    contextQueries: {
      country: (country: string, userId: number | '') => ({
        queryKey: [country, userId],
        queryFn: () =>
          api
            .get(`markets/recommend?country=${encodeURIComponent(country)}&userId=${userId}`)
            .json<Response<RecommendedListType>>(),
      }),
    },
  },
  top5: (criteria: Criteria) => ({
    queryKey: [criteria],
    queryFn: () =>
      api.get(`markets/top?property=${propertyMap[criteria]}`).json<Response<Top5ListType>>(),
  }),
});

const propertyMap = {
  '거래가 많은(전일)': 'TRANSACTION',
  '보상이 많은(전일)': 'REWARD',
};
