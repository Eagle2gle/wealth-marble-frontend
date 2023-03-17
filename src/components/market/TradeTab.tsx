import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useStomp } from '@/hooks/useStomp';
import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { api } from '@/libs/client/api';
import { useTypeSelector } from '@/store';
import type { MarketDetailType } from '@/types/market';
import type { Response } from '@/types/response';
import classNames from '@/utils/classnames';

import OrderInput from './OrderInput';

import BottomSheet from '../common/BottomSheet';
import Modal from '../common/Modal';

const TRADE_TABS = ['구매', '판매', '정정', '체결'] as const;

interface TradeTabProps {
  id: number;
}

const TradeTab = ({ id }: TradeTabProps) => {
  const [tradeTab, setTradeTab] = useState<'구매' | '판매' | '정정' | '체결'>(TRADE_TABS[0]);
  const { publish, subscribe, unsubscribe, isConnected } = useStomp({
    config: { brokerURL: process.env.NEXT_PUBLIC_WS_URL },
    onConnect: (frame) => console.log(frame),
  });
  const token = useTypeSelector((state) => state.user.token);
  const order = useTypeSelector((state) => state.marketOrder);
  const [open, setOpen] = useState(false);
  const {
    data: {
      data: { title, pictures },
    },
  } = useSuspendedQuery<Response<MarketDetailType>>(['market/detail', id], () =>
    api.get(`markets/${id}`).json()
  );
  const modalOpenRef = useRef<HTMLLabelElement>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onOrderClick = (type: 'buy' | 'sell') => () => {
    if (!order[type].quantity || !order[type].price) return;
    const body = JSON.stringify({
      marketId: id,
      price: order[type].price,
      amount: order[type].quantity,
      token,
    });
    setIsError(false);
    publish({
      destination: type === 'buy' ? '/order/purchase' : '/order/sell',
      body,
    });
    setIsLoading(true);
  };

  const tradeTabMap = {
    구매: (
      <div className="flex flex-col items-end gap-2 rounded-md border-grey p-4 md:border">
        <OrderInput amountType="price" tabType="buy" />
        <OrderInput amountType="quantity" tabType="buy" />
        <button
          className={classNames('btn-primary btn w-full', isLoading ? 'loading' : '')}
          onClick={onOrderClick('buy')}
        >
          구매하기
        </button>
      </div>
    ),
    판매: (
      <div className="flex flex-col items-end gap-2 rounded-md border-grey p-4 md:border">
        <OrderInput amountType="price" tabType="sell" />
        <OrderInput amountType="quantity" tabType="sell" />
        <button
          className={classNames('btn-primary btn w-full', isLoading ? 'loading' : '')}
          onClick={onOrderClick('sell')}
        >
          판매하기
        </button>
      </div>
    ),
    정정: <div className=""></div>,
    체결: <div className=""></div>,
  };

  const tabHeader = (
    <div className="tabs w-full items-center">
      {TRADE_TABS.map((tab, index) => (
        <button
          key={index}
          className={classNames(
            'tab tab-bordered h-11 flex-1 border-b border-grey transition-colors md:border-t',
            tab === tradeTab ? 'tab-active border-b-2 !border-b-main !border-t-grey' : ''
          )}
          onClick={() => setTradeTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );

  const buttonColorMap = {
    구매: 'btn-error',
    판매: 'btn-info',
    정정: 'btn-success',
    체결: '',
  };

  useEffect(() => {
    if (!isConnected) return;
    subscribe(`/user/queue/errors`, (message) => {
      console.log(JSON.parse(message.body));
      setIsError(true);
      setIsLoading(false);
      modalOpenRef.current?.click();
    });
    subscribe(`/user/queue/success`, (message) => {
      console.log(JSON.parse(message.body));
      setIsLoading(false);
      modalOpenRef.current?.click();
    });
    return () => {
      unsubscribe(`/user/queue/errors`);
      unsubscribe(`/user/queue/success`);
    };
  }, [subscribe, unsubscribe, isConnected]);

  return (
    <>
      <div className="hidden flex-1 space-y-4 md:block">
        {tabHeader}
        {token ? (
          tradeTabMap[tradeTab]
        ) : (
          <div className="flex flex-col items-center gap-2 rounded-md px-4">
            <span className="py-16">로그인 시 이용 가능합니다.</span>
            <Link href="/login" className="btn-primary btn w-full">
              로그인
            </Link>
          </div>
        )}
      </div>
      <div className="md:hidden">
        <BottomSheet open={open} onDismiss={() => setOpen(false)}>
          {token ? (
            open ? (
              <div className="w-full space-y-4">
                {tabHeader}
                {tradeTabMap[tradeTab]}
              </div>
            ) : (
              <div className="flex w-full gap-2">
                {TRADE_TABS.map((tab, index) => (
                  <button
                    key={index}
                    className={classNames(
                      'btn h-8 min-h-0 flex-1 shadow-md',
                      tab === tradeTab
                        ? `text-white ${buttonColorMap[tab]}`
                        : 'btn-secondary text-black'
                    )}
                    onClick={() => {
                      setTradeTab(tab);
                      setOpen(true);
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )
          ) : (
            <Link href="/login" className="btn-primary btn w-full">
              로그인
            </Link>
          )}
        </BottomSheet>
      </div>
      <label htmlFor="modal" ref={modalOpenRef} hidden />
      <Modal>
        <div className="space-y-4">
          <div className="text-center text-xl font-bold">
            {!isError ? (
              <>
                <div>
                  <span className="text-main">Marble</span>과 함께
                </div>
                <div>
                  주문 요청 <span className="text-main">성공</span> 하였어요
                </div>
              </>
            ) : (
              <div>
                잔액이 부족하여 주문 요청에 <span className="text-red">실패</span> 하였어요
              </div>
            )}
          </div>
          <div className="flex w-full justify-between gap-2 font-bold">
            <div className="avatar">
              <div className="w-20"></div>
              {pictures[0] && (
                <Image
                  className="rounded object-contain"
                  alt=""
                  src={pictures[0]}
                  placeholder="blur"
                  blurDataURL={pictures[0]}
                  fill
                  sizes="80px"
                />
              )}
            </div>
            <div className="flex w-full flex-col justify-between">
              <span>{title}</span>
              <div className="flex justify-between text-sm">
                <span>
                  {tradeTab === '구매'
                    ? order.buy.price.toLocaleString()
                    : order.sell.price.toLocaleString()}
                </span>
                <span></span>
              </div>
              <div className="flex justify-between text-sm">
                주문 수량
                <span className="text-main">
                  {tradeTab === '구매'
                    ? order.buy.quantity.toLocaleString()
                    : order.sell.quantity.toLocaleString()}
                  주
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="btn-primary btn w-full" htmlFor="modal">
              재주문하기
            </label>
            <label className="btn-ghost btn w-full border-grey" htmlFor="modal">
              확인
            </label>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TradeTab;
