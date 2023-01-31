import { useState } from 'react';

import Image from 'next/image';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { fetchCahootDetail } from '@/libs/client/fetcher';
import { useTypeSelector } from '@/store';
import { CahootDetailInfoType } from '@/types/response';

import Modal from '../common/Modal';

const BuyButton = () => {
  const {
    data: { stockPrice, title, images },
  } = useSuspendedQuery<CahootDetailInfoType>(['cahootDetailData'], fetchCahootDetail);
  const quantity = useTypeSelector(({ cahootOrder }) => cahootOrder.quantity);

  return (
    <>
      {/* post 요청 보내기 필요 */}
      <label
        className="btn-primary btn flex h-full w-full justify-around px-1 text-base"
        htmlFor="modal"
      >
        <span className="flex-[0.2] break-keep">공모</span>
        <div className="h-full border-l-2 border-main-light"></div>
        <span className="flex-[0.7] break-keep text-right">
          {(stockPrice * quantity).toLocaleString()}원
        </span>
      </label>
      <Modal>
        <div className="space-y-4">
          <div className="text-center text-xl font-bold">
            <div>
              <span className="text-main">Marble</span>과 함께
            </div>
            <div>
              공모 <span className="text-main">성공</span> 하였어요
            </div>
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
