import { Suspense, useState } from 'react';

import ListItems from './ListItems';

import Search from '../common/Search';

interface ListProps {
  scrollRef: React.RefObject<HTMLDivElement>;
}

const List = ({ scrollRef }: ListProps) => {
  const [keyword, setKeyword] = useState('');

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log('submitted');
    const target = e.target as typeof e.target & {
      search: { value: string };
    };
    setKeyword(target.search.value);
    if (!scrollRef.current) return;
    const top = window.scrollY + scrollRef.current.getBoundingClientRect().top - 70;
    window.scrollTo({ top });
  };

  return (
    <div className="flex min-h-list flex-col gap-4 px-4 md:px-0">
      <div className="flex items-center justify-between">
        <label className="font-bold">공모 목록</label>
        <form onSubmit={onSubmit}>
          <Search />
        </form>
      </div>
      <Suspense fallback={<p>로딩...</p>}>
        <ListItems keyword={keyword} />
      </Suspense>
    </div>
  );
};

export default List;
