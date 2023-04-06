import Link from 'next/link';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { queries } from '@/queries';
import { useTypeSelector } from '@/store';

import { InterestsProps } from './types';

import Carousel from '../Carousel';
import Icon from '../Icons';
import InterestButton from '../InterestButton';

const TypeUrlPathMap = {
  cahoot: 'cahoots',
  market: 'markets',
} as const;

const InterestsCarousel: React.FC<InterestsProps> = ({ scrollRef, type }) => {
  const token = useTypeSelector((state) => state.user.token) ?? '';
  const { queryFn, queryKey } = queries.interests.all(type, token);
  const { data } = useSuspendedQuery(queryKey, queryFn, { enabled: !!token });

  const onAddClick = () => {
    if (!scrollRef.current) return;
    const top = window.scrollY + scrollRef.current.getBoundingClientRect().top - 70;
    window.scrollTo({ top });
  };

  return (
    <Carousel itemCount={data?.data.result.length || 1}>
      <button
        className="carousel-item h-24 w-52 items-center justify-center gap-1 rounded bg-grey text-sm font-semibold"
        onClick={onAddClick}
      >
        <Icon.PlusCircle />
        휴양지를 추가해 주세요
      </button>
      {token &&
        data?.data.result.map(({ title, vacationId }) => (
          <Link
            key={vacationId}
            href={`/${TypeUrlPathMap[type]}/detail/${vacationId}`}
            className="carousel-item flex-col items-center font-semibold"
          >
            <div className="relative flex h-24 w-52 items-center justify-center break-keep rounded bg-gradient-to-br from-blue-start to-blue-end p-6 text-center text-sm text-white">
              {title}
              <div className="absolute right-1 top-1">
                <InterestButton type={type} size="small" id={vacationId} isInterest />
              </div>
            </div>
          </Link>
        ))}
    </Carousel>
  );
};

export default InterestsCarousel;
