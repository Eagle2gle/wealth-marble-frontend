/**
 * source: https://github.com/toss/slash/blob/main/packages/react/react-query/src/hooks/useSuspendedQuery.ts
 * 기존 `@toss/react-query` 라이브러리가 `@tanstack/react-query`의 이전 버전인 `react-query`만 지원해서 현 버전에 맞게 수정함.
 *
 * 기존 useQuery의 경우 suspense 옵션을 사용해도 처음 data를 fetch 해올 때
 * query를 취소(enable: false, queryClient.resetQueries 호출, 네트워크 연결 X)할 수 있기 때문에
 * suspense 옵션을 사용해도 `TData | undefined`로 타입 추론이 됨.
 * 관련 issue: https://github.com/TanStack/query/issues/1297
 */

import { useQuery } from '@tanstack/react-query';
import type {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

export type BaseSuspendedUseQueryResult<TData> = Omit<
  UseQueryResult,
  'data' | 'status' | 'error' | 'isLoading' | 'isError' | 'isFetching'
> & {
  data: TData;
  status: 'success' | 'idle';
};
export type SuspendedUseQueryResultOnSuccess<TData> = BaseSuspendedUseQueryResult<TData> & {
  status: 'success';
  isSuccess: true;
  isIdle: false;
};
export type SuspendedUseQueryResultOnIdle = BaseSuspendedUseQueryResult<undefined> & {
  status: 'idle';
  isSuccess: false;
  isIdle: true;
};
export type SuspendedUseQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'suspense'>;

export function useSuspendedQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<SuspendedUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'enabled'>
): SuspendedUseQueryResultOnSuccess<TData>;
export function useSuspendedQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options: Omit<SuspendedUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'enabled'> & {
    enabled?: true;
  }
): SuspendedUseQueryResultOnSuccess<TData>;
export function useSuspendedQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options: Omit<SuspendedUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'enabled'> & {
    enabled: false;
  }
): SuspendedUseQueryResultOnIdle;
export function useSuspendedQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options: SuspendedUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
): SuspendedUseQueryResultOnSuccess<TData> | SuspendedUseQueryResultOnIdle;
export function useSuspendedQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: SuspendedUseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
) {
  return useQuery(queryKey, queryFn, {
    ...options,
    suspense: true,
  }) as BaseSuspendedUseQueryResult<TData>;
}
