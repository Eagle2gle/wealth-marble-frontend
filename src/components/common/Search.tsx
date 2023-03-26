import { useRef } from 'react';

import Icon from './Icons';

const Search = () => {
  const submitRef = useRef<HTMLButtonElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!submitRef.current) return;
    if (e.target.value === '') {
      submitRef.current.click();
    }
  };

  return (
    <div className="flex items-center rounded border border-black/50 px-2">
      <button ref={submitRef} type="submit">
        <Icon.Search />
      </button>
      <input
        onChange={onChange}
        name="search"
        type="text"
        className="input input-sm focus:outline-none"
        placeholder="장소, 휴양지, 테마명"
      />
    </div>
  );
};

export default Search;
