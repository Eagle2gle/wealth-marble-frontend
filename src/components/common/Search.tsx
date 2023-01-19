import Icon from './Icons';

const Search = () => {
  return (
    <div className="border border-black/50 rounded px-2 flex items-center">
      <Icon.Search />
      <input
        type="text"
        className="input input-sm focus:outline-none"
        placeholder="장소, 휴양지, 테마명"
      />
    </div>
  );
};

export default Search;
