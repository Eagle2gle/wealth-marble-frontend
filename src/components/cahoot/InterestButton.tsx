import { useRouter } from 'next/router';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { fetcher } from '@/libs/client/fetcher';
import { CahootDetailType } from '@/types/cahoot';
import { Response } from '@/types/response';
import classNames from '@/utils/classnames';

import Icon from '../common/Icons';

interface InterestButtonProps {
  hideOnMobile?: boolean;
}

const InterestButton = ({ hideOnMobile = false }: InterestButtonProps) => {
  const router = useRouter();
  const {
    data: {
      data: { interestCount, isInterest },
    },
  } = useSuspendedQuery<Response<CahootDetailType>>(
    ['cahoot/detail', router.query.id],
    fetcher(`${process.env.NEXT_PUBLIC_HOST}/api/cahoots/${router.query.id}?info=detail`)
  );
  return (
    <button
      className={classNames(
        'btn-ghost btn mx-4 gap-1 border-grey',
        isInterest ? 'fill-main text-main' : 'fill-none',
        hideOnMobile ? 'hidden md:flex' : 'md:hidden'
      )}
    >
      <Icon.Bookmark />
      <span className="font-medium">관심상품</span>
      <span>{interestCount.toLocaleString()}</span>
    </button>
  );
};

export default InterestButton;
