import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { api } from '@/libs/client/api';
import { useTypeSelector } from '@/store';
import type { CahootDetailType } from '@/types/cahoot';
import type { MarketDetailType } from '@/types/market';
import type { Response } from '@/types/response';
import classNames from '@/utils/classnames';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Icon from './Icons';

interface InterestButtonProps {
  id: number;
  isInterest?: boolean;
  size: 'small' | 'large';
  hideOnMobile?: boolean;
  type: 'cahoot' | 'market';
}

type MutationBody = {
  userId: number;
  vacationId: number;
};

const InterestButton = ({
  id,
  isInterest,
  size,
  hideOnMobile = false,
  type,
}: InterestButtonProps) => {
  const token = useTypeSelector((state) => state.user.token);
  const userId = useTypeSelector((state) => state.user.id);
  const queryClient = useQueryClient();
  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['cahoot/list'] });
    queryClient.invalidateQueries({ queryKey: ['cahoot/interests'] });
    queryClient.invalidateQueries({ queryKey: ['cahoot/detail', `${id}`] });
    queryClient.invalidateQueries({ queryKey: ['market/list'] });
    queryClient.invalidateQueries({ queryKey: ['market/detail', `${id}`] });
    queryClient.invalidateQueries({ queryKey: ['market/interests'] });
    queryClient.invalidateQueries({ queryKey: ['RecommendListData'] });
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
  const { data: cahootDetailData } = useSuspendedQuery<Response<CahootDetailType>>(
    ['cahoot/detail', `${id}`],
    () => api.get(`cahoots/${id}?info=detail`).json(),
    { enabled: size === 'large' && type === 'cahoot' }
  );
  const { data: marketDetailData } = useSuspendedQuery<Response<MarketDetailType>>(
    ['market/detail', `${id}`],
    () => api.get(`markets/${id}`).json(),
    { enabled: size === 'large' && type === 'market' }
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
    <button
      onClick={onBookmarkClick}
      className={classNames(
        'btn-ghost btn',
        isInterest ? 'fill-main text-main' : 'fill-none',
        size === 'large' ? (hideOnMobile ? 'hidden md:flex' : 'md:hidden') : '',
        size === 'small' ? 'btn-xs btn-circle' : 'mx-4 gap-1 border-grey md:mx-0'
      )}
    >
      <Icon.Bookmark />
      {size === 'large' && (
        <>
          <span className="font-medium text-black">관심상품</span>
          <span className="text-black">
            {cahootDetailData?.data.interestCount.toLocaleString() ??
              marketDetailData?.data.userIds.length.toLocaleString()}
          </span>
        </>
      )}
    </button>
  ) : null;
};

export default InterestButton;
