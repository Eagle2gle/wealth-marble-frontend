import { Suspense, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { queries } from '@/queries';
import type { CahootDeadlineMiniType } from '@/types/cahoot';
import classNames from '@/utils/classnames';
import { ErrorBoundary } from '@sentry/nextjs';

import ErrorFallback from '../common/ErrorFallback';
import Icon from '../common/Icons';

const INTERVAL_DURATION = 3000;
const TRANSITION_DURATION = 300;

const DeadlineBannerWrapper = () => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense>
        <DeadlineBanner />
      </Suspense>
    </ErrorBoundary>
  );
};

const DeadlineBanner = () => {
  const { queryFn, queryKey } = queries.cahoots.deadline._ctx.mini;
  const {
    data: {
      data: { result },
    },
  } = useSuspendedQuery(queryKey, queryFn);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isTransition, setIsTransition] = useState(true);
  const [items, setItems] = useState<CahootDeadlineMiniType['result']>([]);
  const router = useRouter();

  const onBannerClick = () => {
    if (!items.length) return;
    router.push(`/cahoots/detail/${items[currentIndex].id}`);
  };
  // 마우스 오버 시 슬라이드 이동 멈춤
  const onMouseOver = () => {
    if (!items.length || items.length === 1) return;
    setIsMouseOver(true);
  };
  const onMouseOut = () => {
    if (!items.length || items.length === 1) return;
    setIsMouseOver(false);
  };
  // 슬라이드 이동 설정
  useEffect(() => {
    if (!items.length || items.length === 1) return;
    const interval = setInterval(() => {
      if (isMouseOver) return;
      setCurrentIndex((prev) => prev + 1);
      setIsTransition(true);
    }, INTERVAL_DURATION);
    return () => {
      clearInterval(interval);
    };
  }, [isMouseOver, items]);
  // 무한 슬라이드를 위한 복제 슬라이드 추가
  useEffect(() => {
    if (!result.length) return;
    if (result.length === 1) {
      setItems([...result]);
      return;
    }
    setItems([...result, result[0]]);
  }, [result]);
  // 마지막 슬라이드에서 복제 슬라이드로 이동 시 첫 슬라이드로 변경
  useEffect(() => {
    if (!items.length || items.length === 1) return;
    if (currentIndex === items.length - 1) {
      setTimeout(() => {
        setIsTransition(false);
        setCurrentIndex(0);
      }, TRANSITION_DURATION);
    }
  }, [currentIndex, items]);

  return (
    <div
      className="flex h-12 w-full cursor-pointer items-center justify-between bg-tab pl-2 text-[8px] font-semibold md:pl-4 md:text-xs"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onBannerClick}
    >
      <div className="flex items-center gap-1 md:gap-4">
        <div className="rounded-2xl border border-black/50 bg-grey p-1 md:p-1.5">
          오늘 마감 임박
        </div>
        <span className="text-main md:-mx-2">[공모]</span>
        <div className="overflow-hidden">
          <div
            className={classNames(
              'flex h-8 flex-col',
              isTransition ? 'transition-all duration-300' : ''
            )}
            style={{ transform: `translateY(-${currentIndex}00%)` }}
          >
            {items.map(({ competitionRate, title }, index) => (
              <div key={index} className="flex h-full flex-none items-center gap-1 md:gap-2">
                <span className="truncate">{title}</span>
                <span className="text-main">경쟁률 {competitionRate}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className="btn-ghost btn-circle btn hidden md:flex">
        <Icon.Right />
      </button>
    </div>
  );
};

export default DeadlineBannerWrapper;
