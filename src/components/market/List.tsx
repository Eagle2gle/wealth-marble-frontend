import { Suspense, useState } from 'react';

import ListItems from './ListItems';

import Search from '../common/Search';

const List = () => {
  const [keyword, setKeyword] = useState('');

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      search: { value: string };
    };
    setKeyword(target.search.value);
  };

  return (
    <div className="flex flex-col gap-4 px-4 md:px-0">
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
