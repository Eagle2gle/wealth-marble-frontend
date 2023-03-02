import Link from 'next/link';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { api } from '@/libs/client/api';
import { useTypeSelector } from '@/store';
import { Interests, Response } from '@/types/response';

import Carousel from './Carousel';
import Icon from './Icons';
import InterestButton from './InterestButton';

interface InterestsProps {
  type: 'cahoot' | 'market';
  scrollRef: React.RefObject<HTMLDivElement>;
}

const TypeUrlPathMap = {
  cahoot: 'cahoots',
  market: 'markets',
} as const;

const Interests = ({ scrollRef, type }: InterestsProps) => {
  const token = useTypeSelector((state) => state.user.token);
  const { data } = useSuspendedQuery<Response<Interests>>(
    [`${type}/interests`],
    () =>
      api
        .get(`auth/interests/me?page=0&size=10&type=${type}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .json<Response<Interests>>(),
    { enabled: !!token }
  );

  const onAddClick = () => {
    if (!scrollRef.current) return;
    const top = window.scrollY + scrollRef.current.getBoundingClientRect().top - 70;
    window.scrollTo({ top });
  };

  return (
    <div className="flex flex-col gap-2 px-3 md:px-0">
      <label className="font-bold">관심가는 휴양지</label>
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
                  <InterestButton type="small" id={vacationId} isInterest />
                </div>
              </div>
            </Link>
          ))}
      </Carousel>
    </div>
  );
};

export default Interests;
