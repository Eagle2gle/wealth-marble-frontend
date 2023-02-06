import { useEffect, useRef } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { fetcher } from '@/libs/client/fetcher';
import { useTypeSelector } from '@/store';
import type { CahootDetailType } from '@/types/cahoot';
import type { Response } from '@/types/response';
import classNames from '@/utils/classnames';
import { useMutation } from '@tanstack/react-query';

import Modal from '../common/Modal';

const BuyButton = () => {
  const router = useRouter();
  const {
    data: {
      data: { images, title, stockPrice },
    },
  } = useSuspendedQuery<Response<CahootDetailType>>(
    ['cahoot/detail', router.query.id],
    fetcher(`${process.env.NEXT_PUBLIC_HOST}/api/cahoots/${router.query.id}?info=detail`)
  );
  const quantity = useTypeSelector(({ cahootOrder }) => cahootOrder.quantity);
  const {
    mutate,
    isLoading,
    data: response,
  } = useMutation<Response, Error, { stocks: number }>({
    mutationFn: (data) =>
      fetch(`/api/cahoots/${router.query.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then((res) => res.json()),
  });
  const modalOpenRef = useRef<HTMLLabelElement>(null);

  const onBuyClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (quantity <= 0) return;
    mutate({ stocks: quantity });
  };

  useEffect(() => {
    if (response) {
      modalOpenRef.current?.click();
    }
  }, [response]);

  return (
    <>
      <button
        className={classNames(
          'btn-primary btn flex h-full w-full justify-around px-1 text-base',
          quantity ? '' : 'btn-disabled',
          isLoading ? 'loading' : ''
        )}
        onClick={onBuyClick}
      >
        <span className="flex-[0.2] break-keep">공모</span>
        <div
          className={classNames(
            quantity ? 'border-main-light' : 'border-grey',
            'h-full border-l-2 border-main-light'
          )}
        ></div>
        <span className="flex-[0.7] break-keep text-right">
          {(stockPrice * quantity).toLocaleString()}원
        </span>
      </button>
      <label htmlFor="modal" ref={modalOpenRef} hidden />
      <Modal>
        <div className="space-y-4">
          <div className="text-center text-xl font-bold">
            {response && response.status === 'success' ? (
              <>
                <div>
                  <span className="text-main">Marble</span>과 함께
                </div>
                <div>
                  공모 <span className="text-main">성공</span> 하였어요
                </div>
              </>
            ) : (
              <>
                <div>
                  공모에 <span className="text-red">실패</span> 하였어요
                </div>
              </>
            )}
          </div>
          <div className="flex w-full justify-between gap-2 font-bold">
            <div className="avatar">
              <div className="w-20"></div>
              <Image
                className="rounded object-contain"
                alt=""
                src={images[0]}
                placeholder="blur"
                blurDataURL={images[0]}
                fill
                sizes="80px"
              />
            </div>
            <div className="flex w-full flex-col justify-between">
              <span>{title}</span>
              <div className="flex justify-between text-sm">
                주문 수량 <span className="text-main">{quantity}주</span>
              </div>
              <div className="flex justify-between text-sm">
                주문 수량 <span>{(quantity * stockPrice).toLocaleString()}원</span>
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

export default BuyButton;
