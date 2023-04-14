import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { queries } from '@/queries';
import { useTypeSelector } from '@/store';
import type { CahootDetailType, CahootListType } from '@/types/cahoot';
import type { MarketDetailType, RecommendedListType } from '@/types/market';
import type { Interests, Response } from '@/types/response';
import classNames from '@/utils/classnames';
import {
  type MutateOptions,
  useMutation,
  useQueryClient,
  type InfiniteData,
} from '@tanstack/react-query';

import Icon from './Icons';

import type { HTTPError } from 'ky';

interface InterestButtonProps {
  id: number;
  isInterest: boolean;
  size: 'small' | 'large';
  hideOnMobile?: boolean;
  type: 'cahoot' | 'market';
  country?: string;
}

type MutationBody = {
  userId: number;
  vacationId: number;
};

const queryKeyMap = {
  cahoot: 'cahoots',
  market: 'markets',
} as const;

const InterestButton = ({
  id,
  isInterest,
  size,
  hideOnMobile = false,
  type,
  country,
}: InterestButtonProps) => {
  type InterestMutateOptions = MutateOptions<
    Response,
    HTTPError,
    MutationBody,
    Awaited<ReturnType<typeof getPreviousData>>
  >;

  const token = useTypeSelector((state) => state.user.token) ?? '';
  const userId = useTypeSelector((state) => state.user.id) ?? '';
  const keyword = useTypeSelector((state) => state.cahootSearch.keyword);
  const queryClient = useQueryClient();

  /**
   * query key 가져오기
   * keyword가 존재하는 경우 공모 목록에 있는 버튼이고,
   * country가 존재하는 경우 추천 목록에 있는 버튼이다.
   */
  const { queryKey: interestsAllKey } = queries.interests.all(type, token);
  const { queryKey: detailKey } = queries[queryKeyMap[type]].detail(String(id), userId);
  const { queryKey: listKey } = queries.cahoots.list(keyword, userId);
  const marketsRecommendQuery =
    typeof country === 'string' && queries.markets.recommend(country, userId);

  /**
   * mutate가 호출되었을 때
   * 이전 데이터를 가져오고, 각 상황에 맞게 데이터를 변경한다.
   */
  const onMutate = async (body: MutationBody) => {
    const previousData = await getPreviousData();
    if (previousData.previousInterests) {
      updateInterest(previousData.previousInterests, body);
    }
    if (previousData.previousCahootList) {
      updateList(previousData.previousCahootList, body);
    }
    if (previousData.previousMarketRecommend) {
      updateRecommend(previousData.previousMarketRecommend, body);
    }
    if (previousData.previousDetail) {
      updateDetail(previousData.previousDetail, body);
    }
    return { ...previousData };
  };

  /**
   * mutation이 실패했을 때
   * onMutate에서 반환된 context를 사용하여 이전 데이터로 복원한다.
   */
  const onError: InterestMutateOptions['onError'] = (err, variables, context) => {
    if (context?.previousInterests) {
      queryClient.setQueryData(interestsAllKey, context.previousInterests);
    }
    if (context?.previousCahootList && type === 'cahoot') {
      queryClient.setQueryData(listKey, context.previousCahootList);
    }
    if (context?.previousMarketRecommend && marketsRecommendQuery) {
      queryClient.setQueryData(marketsRecommendQuery.queryKey, context.previousMarketRecommend);
    }
    if (context?.previousDetail) {
      queryClient.setQueryData(detailKey, context.previousDetail);
    }
  };

  /**
   * mutate 성공 또는 실패 이후
   * 상황에 맞는 쿼리를 항상 최신으로 업데이트한다.
   */
  const onSettled: InterestMutateOptions['onSettled'] = () => {
    queryClient.invalidateQueries({ queryKey: interestsAllKey });
    queryClient.invalidateQueries({ queryKey: detailKey });
    if (type === 'cahoot') {
      queryClient.invalidateQueries({ queryKey: listKey });
    }
    if (marketsRecommendQuery) {
      queryClient.invalidateQueries({ queryKey: marketsRecommendQuery.queryKey });
    }
  };

  /**
   * mutate가 호출되었을 때
   * refetch로 인해 optimistic update를 덮어쓰지 않기 위해
   * 쿼리를 취소하고, 이전 데이터를 가져온다.
   */
  const getPreviousData = async () => {
    const cancelQueries: Promise<void>[] = [
      queryClient.cancelQueries({ queryKey: interestsAllKey }),
      queryClient.cancelQueries({ queryKey: detailKey }),
    ];
    if (type === 'cahoot') {
      cancelQueries.push(queryClient.cancelQueries({ queryKey: listKey }));
    }
    if (marketsRecommendQuery) {
      cancelQueries.push(queryClient.cancelQueries({ queryKey: marketsRecommendQuery.queryKey }));
    }
    await Promise.all(cancelQueries);

    const previousInterests = queryClient.getQueryData<Response<Interests>>(interestsAllKey);
    const previousDetail =
      queryClient.getQueryData<Response<CahootDetailType | MarketDetailType>>(detailKey);
    const previousCahootList =
      queryClient.getQueryData<InfiniteData<Response<CahootListType>>>(listKey);
    const previousMarketRecommend =
      marketsRecommendQuery &&
      queryClient.getQueryData<Response<RecommendedListType>>(marketsRecommendQuery.queryKey);

    return { previousInterests, previousDetail, previousCahootList, previousMarketRecommend };
  };

  const updateInterest = (previous: Response<Interests>, body: MutationBody) => {
    if (isInterest) {
      const filteredInterests = previous.data.result.filter(
        (interest) => interest.vacationId !== body.vacationId
      );
      queryClient.setQueryData(interestsAllKey, {
        ...previous,
        data: {
          ...previous.data,
          result: filteredInterests,
        },
      });
    }
  };
  const updateList = (previous: InfiniteData<Response<CahootListType>>, body: MutationBody) => {
    if (type === 'cahoot') {
      const mutatedList = previous.pages.map((page) => {
        if (!page.data.result.some((cahoot) => cahoot.id === body.vacationId)) {
          return page;
        }
        return {
          ...page,
          data: {
            ...page.data,
            result: page.data.result.map((cahoot) => {
              if (cahoot.id !== body.vacationId) {
                return cahoot;
              }
              return {
                ...cahoot,
                isInterest: !isInterest,
              };
            }),
          },
        };
      });
      queryClient.setQueryData(listKey, {
        ...previous,
        pages: mutatedList,
      });
    }
  };
  const updateRecommend = (previous: Response<RecommendedListType>, body: MutationBody) => {
    if (marketsRecommendQuery) {
      const mutatedRecommend = previous.data.result.map((market) => {
        if (market.id !== body.vacationId) {
          return market;
        }
        return {
          ...market,
          isInterest: !isInterest,
        };
      });
      queryClient.setQueryData(marketsRecommendQuery.queryKey, {
        ...previous,
        data: {
          ...previous.data,
          result: mutatedRecommend,
        },
      });
    }
  };
  const updateDetail = (
    previous: Response<CahootDetailType | MarketDetailType>,
    body: MutationBody
  ) => {
    if (type === 'cahoot') {
      const mutatedInterestCount =
        (previous.data as CahootDetailType).interestCount - (isInterest ? 1 : -1);
      queryClient.setQueryData(detailKey, {
        ...previous,
        data: {
          ...previous.data,
          isInterest: !isInterest,
          interestCount: mutatedInterestCount,
        },
      });
    } else {
      const userIds = (previous.data as MarketDetailType).userIds;
      const mutatedUserIds = isInterest
        ? userIds.filter((id) => id !== body.userId)
        : [...userIds, body.userId];
      queryClient.setQueryData(detailKey, {
        ...previous,
        data: {
          ...previous.data,
          userIds: mutatedUserIds,
        },
      });
    }
  };

  const { mutate: addInterest } = useMutation({
    ...queries.interests.add(token),
    onSettled,
    onMutate,
    onError,
  });
  const { mutate: deleteInterest } = useMutation({
    ...queries.interests.delete(token),
    onSettled,
    onMutate,
    onError,
  });
  const { queryFn: cahootQueryFn, queryKey: cahootQueryKey } = queries.cahoots.detail(
    String(id),
    userId
  );
  const { queryFn: marketQueryFn, queryKey: marketQueryKey } = queries.markets.detail(String(id));
  const { data: cahootDetailData } = useSuspendedQuery(cahootQueryKey, cahootQueryFn, {
    enabled: size === 'large' && type === 'cahoot',
  });
  const { data: marketDetailData } = useSuspendedQuery(marketQueryKey, marketQueryFn, {
    enabled: size === 'large' && type === 'market',
  });

  const onBookmarkClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!userId) return;
    const body = { userId, vacationId: id };
    if (isInterest) {
      deleteInterest(body);
    } else {
      addInterest(body);
    }
  };

  return userId ? (
    <button
      onClick={onBookmarkClick}
      className={classNames(
        'btn-ghost btn',
        isInterest ? 'fill-main text-main' : 'fill-none',
        size === 'large' ? (hideOnMobile ? 'hidden md:flex' : 'md:hidden') : '',
        size === 'small' ? 'btn-xs btn-circle' : 'mx-4 gap-1 border-grey md:mx-0'
      )}
    >
      <Icon.Bookmark />
      {size === 'large' && (
        <>
          <span className="font-medium text-black">관심상품</span>
          <span className="text-black">
            {cahootDetailData?.data.interestCount.toLocaleString() ??
              marketDetailData?.data.userIds.length.toLocaleString()}
          </span>
        </>
      )}
    </button>
  ) : null;
};

export default InterestButton;
