import ky from 'ky-universal';
import Link from 'next/link';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { useTypeSelector } from '@/store';
import { Interests, Response } from '@/types/response';
import { useMutation } from '@tanstack/react-query';

import Carousel from '../common/Carousel';
import Icon from '../common/Icons';

interface InterestsProps {
  type: 'cahoot' | 'market';
  scrollRef: React.RefObject<HTMLDivElement>;
}

const TypeUrlPathMap = {
  cahoot: 'cahoots',
  market: 'markets',
} as const;

const Interests = ({ scrollRef, type }: InterestsProps) => {
  const userId = useTypeSelector((state) => state.user.id);
  const token = useTypeSelector((state) => state.user.token);
  const { data } = useSuspendedQuery<Response<Interests>>(
    [`${type}/interests`],
    () =>
      ky
        .get(`${process.env.NEXT_PUBLIC_HOST}/api/auth/interests/me?page=0&size=10`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .json<Response<Interests>>(),
    { enabled: !!token }
  );
  const { mutate } = useMutation<Response, Error, { userId: number; vacationId: number }>({
    mutationFn: (body) =>
      ky
        .delete(`${process.env.NEXT_PUBLIC_HOST}/api/auth/interests`, {
          json: body,
          headers: { Authorization: `Bearer ${token}` },
        })
        .json(),
  });

  const onDeleteClick =
    (interestId: number): React.MouseEventHandler<HTMLButtonElement> =>
    (e) => {
      e.preventDefault();
      if (!userId) return;
      mutate({ userId, vacationId: interestId });
    };
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
          data?.data.result.filter(Boolean).map(({ title, picture: { id } }) => (
            <Link
              key={id}
              href={`/${TypeUrlPathMap[type]}/detail/${id}`}
              className="carousel-item flex-col items-center font-semibold"
            >
              <div className="relative flex h-24 w-52 items-center justify-center break-keep rounded bg-gradient-to-br from-blue-start to-blue-end p-6 text-center text-sm text-white">
                {title}
                <div className="absolute right-1 top-1">
                  <button
                    onClick={onDeleteClick(id)}
                    className="btn-ghost btn-xs btn-circle btn fill-main text-main"
                  >
                    <Icon.Bookmark />
                  </button>
                </div>
              </div>
            </Link>
          ))}
      </Carousel>
    </div>
  );
};

export default Interests;
