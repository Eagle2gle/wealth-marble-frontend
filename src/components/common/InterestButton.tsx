import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { api } from '@/libs/client/api';
import { useTypeSelector } from '@/store';
import type { CahootDetailType } from '@/types/cahoot';
import type { Response } from '@/types/response';
import classNames from '@/utils/classnames';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Icon from './Icons';

interface InterestButtonProps {
  id: number;
  isInterest?: boolean;
  type: 'small' | 'large';
  hideOnMobile?: boolean;
}

type MutationBody = {
  userId: number;
  vacationId: number;
};

const InterestButton = ({ id, isInterest, type, hideOnMobile = false }: InterestButtonProps) => {
  const token = useTypeSelector((state) => state.user.token);
  const userId = useTypeSelector((state) => state.user.id);
  const queryClient = useQueryClient();
  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['cahoot/list'] });
    queryClient.invalidateQueries({ queryKey: ['cahoot/interests'] });
    queryClient.invalidateQueries({ queryKey: ['cahoot/detail', `${id}`] });
    queryClient.invalidateQueries({ queryKey: ['market/list'] });
  };
  const { mutate: addInterest } = useMutation<Response, Error, MutationBody>({
    mutationFn: (body) =>
      api
        .post(`auth/interests`, { json: body, headers: { Authorization: `Bearer ${token}` } })
        .json(),
    onSuccess,
  });
  const { mutate: deleteInterest } = useMutation<Response, Error, MutationBody>({
    mutationFn: (body) =>
      api
        .delete(`auth/interests`, { json: body, headers: { Authorization: `Bearer ${token}` } })
        .json(),
    onSuccess,
  });
  const { data } = useSuspendedQuery<Response<CahootDetailType>>(
    ['cahoot/detail', `${id}`],
    () => api.get(`cahoots/${id}?info=detail`).json(),
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

  return userId ? (
    type === 'small' ? (
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
    )
  ) : null;
};

export default InterestButton;
