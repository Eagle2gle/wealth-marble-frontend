import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { queries } from '@/queries';
import { useTypeSelector } from '@/store';
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
  const token = useTypeSelector((state) => state.user.token) ?? '';
  const userId = useTypeSelector((state) => state.user.id);
  const queryClient = useQueryClient();
  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: queries.cahoots.list._def });
    queryClient.invalidateQueries({ queryKey: queries.interests.all._def });
    queryClient.invalidateQueries({ queryKey: queries.cahoots.detail(String(id)).queryKey });
    queryClient.invalidateQueries({ queryKey: queries.markets.list._def });
    queryClient.invalidateQueries({ queryKey: queries.markets.detail(String(id)).queryKey });
    queryClient.invalidateQueries({ queryKey: queries.markets.recommend._def });
  };

  const { mutate: addInterest } = useMutation<Response, Error, MutationBody>({
    ...queries.interests.add(token),
    onSuccess,
  });
  const { mutate: deleteInterest } = useMutation<Response, Error, MutationBody>({
    ...queries.interests.delete(token),
    onSuccess,
  });
  const { queryFn: cahootQueryFn, queryKey: cahootQueryKey } = queries.cahoots.detail(String(id));
  const { queryFn: marketQueryFn, queryKey: marketQueryKey } = queries.markets.detail(String(id));
  const { data: cahootDetailData } = useSuspendedQuery(cahootQueryKey, cahootQueryFn, {
    enabled: size === 'large' && type === 'cahoot',
  });
  const { data: marketDetailData } = useSuspendedQuery(marketQueryKey, marketQueryFn, {
    enabled: size === 'large' && type === 'market',
  });

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
