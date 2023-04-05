import Image from 'next/image';
import Link from 'next/link';

import InterestButton from '@/components/common/InterestButton';
import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { queries } from '@/queries';
import { useTypeSelector } from '@/store';

interface RecommendedListItemsProps {
  selectedCountry: string;
}

const RecommendedListItems: React.FC<RecommendedListItemsProps> = ({ selectedCountry }) => {
  const userId = useTypeSelector((state) => state.user.id) ?? '';
  const { queryFn, queryKey } = queries.markets.recommend._ctx.country(selectedCountry, userId);
  const {
    data: {
      data: { result },
    },
  } = useSuspendedQuery(queryKey, queryFn);
  return (
    <div className="grid w-full grid-cols-6 gap-4 gap-y-4 max-md:carousel md:grid-cols-3 ">
      {result?.map(({ id, isInterest, title, expectedRateOfReturn, image }) => (
        <Link
          href={`/cahoots/detail/${id}`}
          key={id}
          className="flex w-32 flex-col gap-1 rounded border border-grey shadow-md"
        >
          {/* 이미지 */}
          <div className="avatar">
            <div className="relative w-32 rounded-t bg-grey">
              {image && (
                <Image
                  src={image}
                  alt={title}
                  className="rounded-t md:rounded-lg"
                  fill
                  sizes="128px"
                />
              )}
            </div>
            <div className="absolute right-2 top-2">
              <InterestButton id={id} size="small" isInterest={isInterest} type="market" />
            </div>
          </div>
          <div className="relative flex w-full flex-col justify-center overflow-hidden py-1 px-2 text-[8px]">
            <div className="flex gap-2 font-bold">
              <span className="rounded bg-main px-1 text-white">Hot</span>
              <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">{title}</span>
            </div>
            <div className="flex flex-col gap-4"></div>
            <div className="text-right">
              <span className="text-[6px] text-black/60">
                예상 수익률 <span className="text-main">{expectedRateOfReturn}%</span>
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RecommendedListItems;
