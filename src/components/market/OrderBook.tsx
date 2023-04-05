import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { useStomp } from '@/hooks/useStomp';
import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { queries } from '@/queries';
import { useTypeDispatch, useTypeSelector } from '@/store';
import { setBuyPriceByNumber, setSellPriceByNumber } from '@/store/modules/marketOrder';
import type { MarketOrder, MarketOrderList } from '@/types/market';
import type { Response } from '@/types/response';
import classNames from '@/utils/classnames';
import { getWeekDuration } from '@/utils/date';
import { useQueryClient } from '@tanstack/react-query';

const OrderBook = () => {
  const {
    query: { id },
  } = useRouter();
  const { subscribe, unsubscribe, isConnected } = useStomp({
    config: { brokerURL: process.env.NEXT_PUBLIC_WS_URL },
    onConnect: (frame) => console.log(frame),
  });
  const dispatch = useTypeDispatch();
  const userId = useTypeSelector((state) => state.user.id);
  const queryClient = useQueryClient();
  const { queryFn: tradeQueryFn, queryKey: tradeQueryKey } = queries.markets.trade(String(id));
  const {
    data: {
      data: { result },
    },
  } = useSuspendedQuery(tradeQueryKey, tradeQueryFn, {
    staleTime: Infinity,
  });
  const [weekStart, weekEnd] = getWeekDuration(new Date());
  const [lastWeekStart, lastWeekEnd] = getWeekDuration(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );
  const { queryFn: thisWeekQueryFn, queryKey: thisWeekQueryKey } = queries.markets.transaction._ctx
    .history(String(id))
    ._ctx.week(weekStart, weekEnd);
  const { queryFn: lastWeekQueryFn, queryKey: lastWeekQueryKey } = queries.markets.transaction._ctx
    .history(String(id))
    ._ctx.week(lastWeekStart, lastWeekEnd);
  const {
    data: {
      data: { result: thisWeek },
    },
  } = useSuspendedQuery(thisWeekQueryKey, thisWeekQueryFn);
  const {
    data: {
      data: { result: lastWeek },
    },
  } = useSuspendedQuery(lastWeekQueryKey, lastWeekQueryFn);

  const sell = result.filter(({ orderType }) => orderType === 'SELL');
  const buy = result.filter(({ orderType }) => orderType === 'BUY');
  const thisWeekPrices = thisWeek.map(({ price }) => price);
  const weekHigh = Math.max(...thisWeekPrices);
  const weekLow = Math.min(...thisWeekPrices);

  const onPriceClick = (price: number) => () => {
    if (!userId) return;
    dispatch(setBuyPriceByNumber(price));
    dispatch(setSellPriceByNumber(price));
  };

  useEffect(() => {
    if (!isConnected) return;
    subscribe(`/topic/market/${id}`, (message) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { marketId: _, ...newData }: MarketOrder = JSON.parse(message.body);
      console.log(newData);
      if (newData.amount === 0) {
        queryClient.invalidateQueries(queries.markets.trade(String(id)).queryKey);
        return;
      }

      queryClient.setQueryData<Response<MarketOrderList>>(
        queries.markets.trade(String(id)).queryKey,
        (oldData) => {
          if (!oldData) return oldData;
          const newResult = [
            ...oldData.data.result.filter(({ price }) => price !== newData.price),
            newData,
          ].sort((a, b) => b.price - a.price);
          const sell = newResult.filter(({ orderType }) => orderType === 'SELL');
          const buy = newResult.filter(({ orderType }) => orderType === 'BUY');
          const refinedResult: Omit<MarketOrder, 'marketId'>[] = [];
          sell.length > 5
            ? refinedResult.push(...sell.slice(sell.length - 5, sell.length))
            : refinedResult.push(...sell);
          buy.length > 5 ? refinedResult.push(...buy.slice(0, 5)) : refinedResult.push(...buy);

          return {
            ...oldData,
            data: { result: refinedResult },
          };
        }
      );
      queryClient.invalidateQueries({
        queryKey: queries.markets.transaction._ctx.history(String(id)).queryKey,
      });
      queryClient.invalidateQueries({ queryKey: queries.markets.detail(String(id)).queryKey });
    });
    return () => {
      unsubscribe(`/topic/market/${id}`);
    };
  }, [subscribe, id, unsubscribe, isConnected, queryClient]);
  return (
    <div className="w-full border-y border-grey md:max-w-[450px]">
      <div className="flex h-11 items-center border-b border-grey text-center font-bold text-dark-grey">
        <span className="flex-1">판매 수량</span>
        <span className="flex-1">가격</span>
        <span className="flex-1">구매 수량</span>
      </div>
      <div className="flex flex-col">
        <div className="flex border-b border-grey">
          <div className="flex flex-[2] flex-col text-center">
            {Array(5 - result.filter(({ orderType }) => orderType === 'SELL').length)
              .fill(undefined)
              .map((_, index) => (
                <div key={index} className="flex">
                  <span className="h-11 flex-1 bg-white"></span>
                  <div className="h-11 flex-1 bg-sell"></div>
                </div>
              ))}
            {sell.map(({ amount, price }, index) => (
              <button
                key={index}
                className="flex text-sm transition-all hover:brightness-90"
                onClick={onPriceClick(price)}
              >
                <span className="flex h-11 flex-1 items-center justify-center bg-white font-medium text-blue">
                  {amount}
                </span>
                <div className="flex h-11 flex-1 items-center justify-center gap-1 bg-sell">
                  <span className="font-bold text-red">{price.toLocaleString()}</span>
                  <span className="text-[8px] font-medium text-grey-middle">1.2%</span>
                </div>
              </button>
            ))}
          </div>
          <div className="flex flex-1 items-end">
            <div className="flex w-full flex-col gap-3 p-2 text-xs text-grey-middle">
              <span className="font-bold">최근 1주일</span>
              <div className="flex justify-between">
                최고가
                <span
                  className={classNames(
                    'font-bold',
                    weekHigh === -Infinity ? 'text-black' : 'text-red'
                  )}
                >
                  {weekHigh === -Infinity ? '-' : weekHigh.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                최저가
                <span
                  className={classNames(
                    'font-bold',
                    weekLow === Infinity ? 'text-black' : 'text-blue'
                  )}
                >
                  {weekLow === Infinity ? '-' : weekLow.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row-reverse">
          <div className="flex flex-[2] flex-col text-center">
            {buy.map(({ amount, price }, index) => (
              <button
                key={index}
                className="flex flex-row-reverse text-sm transition-all hover:brightness-90"
                onClick={onPriceClick(price)}
              >
                <span className="flex h-11 flex-1 items-center justify-center bg-white font-medium text-red">
                  {amount}
                </span>
                <div className="flex h-11 flex-1 items-center justify-center gap-1 bg-buy">
                  <span className="font-bold text-red">{price.toLocaleString()}</span>
                  <span className="text-[8px] font-medium text-grey-middle">1.2%</span>
                </div>
              </button>
            ))}
            {Array(5 - result.filter(({ orderType }) => orderType === 'BUY').length)
              .fill(undefined)
              .map((_, index) => (
                <div key={index} className="flex flex-row-reverse">
                  <span className="h-11 flex-1 bg-white"></span>
                  <div className="h-11 flex-1 bg-buy"></div>
                </div>
              ))}
          </div>
          <div className="flex flex-1">
            <div className="flex w-full flex-col gap-3 p-2 text-xs text-grey-middle">
              <span className="font-bold">최근 거래량</span>
              <div className="flex justify-between">
                이번 주
                <span className="font-bold text-black">
                  {thisWeek.reduce((sum, { amount }) => sum + amount, 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                지난 주
                <span className="font-bold text-black">
                  {lastWeek.reduce((sum, { amount }) => sum + amount, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-11 items-center border-t border-grey text-center font-bold">
        <span className="flex-1 text-blue">
          {sell.reduce((sum, { amount }) => sum + amount, 0).toLocaleString()}
        </span>
        <span className="flex-1">총수량</span>
        <span className="flex-1 text-red">
          {buy.reduce((sum, { amount }) => sum + amount, 0).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default OrderBook;
