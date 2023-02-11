import Icon from './Icons';

const Search = () => {
  return (
    <div className="flex items-center rounded border border-black/50 px-2">
      <Icon.Search />
      <input
        name="search"
        type="text"
        className="input input-sm focus:outline-none"
        placeholder="장소, 휴양지, 테마명"
      />
    </div>
  );
};

export default Search;
