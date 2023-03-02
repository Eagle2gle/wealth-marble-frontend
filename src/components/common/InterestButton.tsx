import ky from 'ky-universal';

import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { useTypeSelector } from '@/store';
import { CahootDetailType } from '@/types/cahoot';
import { Response } from '@/types/response';
import classNames from '@/utils/classnames';
import { useMutation } from '@tanstack/react-query';

import Icon from './Icons';

interface InterestButtonProps {
  id: number;
  isInterest?: boolean;
  type: 'small' | 'large';
  hideOnMobile?: boolean;
}

const InterestButton = ({ id, isInterest, type, hideOnMobile = false }: InterestButtonProps) => {
  const token = useTypeSelector((state) => state.user.token);
  const userId = useTypeSelector((state) => state.user.id);
  const { mutate: addInterest } = useMutation<
    Response,
    Error,
    { userId: number; vacationId: number }
  >({
    mutationFn: (body) =>
      ky.post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/interests`, { json: body }).json(),
  });
  const { mutate: deleteInterest } = useMutation<
    Response,
    Error,
    { userId: number; vacationId: number }
  >({
    mutationFn: (body) =>
      ky
        .delete(`${process.env.NEXT_PUBLIC_HOST}/api/auth/interests`, {
          json: body,
          headers: { Authorization: `Bearer ${token}` },
        })
        .json(),
  });
  const { data } = useSuspendedQuery<Response<CahootDetailType>>(
    ['cahoot/detail', id],
    () => ky.get(`${process.env.NEXT_PUBLIC_HOST}/api/cahoots/${id}?info=detail`).json(),
    { enabled: type === 'large' }
  );

  const onBookmarkClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!userId) return;
    const body = { userId, vacationId: id };
    if (isInterest) {
      deleteInterest(body);
    } else {
      addInterest(body);
    }
  };

  return type === 'small' ? (
    <button
      onClick={onBookmarkClick}
      className={classNames(
        'btn-ghost btn-xs btn-circle btn',
        isInterest ? 'fill-main text-main' : 'fill-none'
      )}
    >
      <Icon.Bookmark />
    </button>
  ) : (
    <button
      className={classNames(
        'btn-ghost btn mx-4 gap-1 border-grey',
        data?.data.isInterest ? 'fill-main text-main' : 'fill-none',
        hideOnMobile ? 'hidden md:flex' : 'md:hidden'
      )}
      onClick={onBookmarkClick}
    >
      <Icon.Bookmark />
      <span className="font-medium">관심상품</span>
      <span>{data?.data.interestCount.toLocaleString()}</span>
    </button>
  );
};

export default InterestButton;
