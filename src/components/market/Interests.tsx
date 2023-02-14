import Link from 'next/link';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { Response } from '@/types/response';

import Carousel from '../common/Carousel';
import Icon from '../common/Icons';

const Interests = () => {
  const {
    data: { data: interests },
  } = useSuspendedQuery<Response<{ id: number; title: string }[]>>(['market/interests'], () =>
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/mock/markets/interests`).then((res) => res.json())
  );

  const onBookmarkClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-2 px-3 md:px-0">
      <label className="font-bold">관심가는 휴양지</label>
      <Carousel itemCount={interests.length}>
        {interests.map(({ id, title }) => (
          <Link
            key={id}
            href={`/markets/detail/${id}`}
            className="carousel-item flex-col items-center font-semibold"
          >
            <div className="from-blue to-sell relative w-52 break-keep rounded bg-gradient-to-br from-blue-start to-blue-end p-6 text-center text-sm text-white">
              {title}
              <div className="absolute right-1 top-1">
                <button
                  onClick={onBookmarkClick}
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
