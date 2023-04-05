import { Suspense, useState } from 'react';

import { ErrorBoundary } from '@sentry/nextjs';

import CahootItems from './CahootItems';
import MarketItems from './MarketItems';
import ItemSkeleton from './Skeleton';

import ErrorFallback from '../ErrorFallback';
import Search from '../Search';

interface ListProps {
  scrollRef: React.RefObject<HTMLDivElement>;
  type: 'market' | 'cahoot';
}

const typeMap = {
  market: '마켓 목록',
  cahoot: '공모 목록',
};

const List = ({ scrollRef, type }: ListProps) => {
  const [keyword, setKeyword] = useState('');

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };
    setKeyword(target.search.value);
    if (!scrollRef.current) return;
    const top = window.scrollY + scrollRef.current.getBoundingClientRect().top - 70;
    window.scrollTo({ top });
  };

  const itemsMap = {
    market: <MarketItems keyword={keyword} />,
    cahoot: <CahootItems keyword={keyword} />,
  };

  return (
    <div className="flex min-h-list flex-col gap-4 px-4 md:px-0">
      <div className="flex items-center justify-between">
        <label className="font-bold">{typeMap[type]}</label>
        <form onSubmit={onSubmit}>
          <Search />
        </form>
      </div>
      <ErrorBoundary fallback={<ErrorFallback />}>
        {/** @todo 스켈레톤 ui 추가 */}
        <Suspense fallback={<ItemSkeleton type={type} />}>{itemsMap[type]}</Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default List;
