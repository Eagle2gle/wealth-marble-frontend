import classNames from '@/utils/classnames';

interface TabButtonProps<T> {
  tabs: readonly T[];
  currentTab: T;
  onTabClick: (tab: T) => () => void;
}

const TabButton = <T extends string>({ tabs, currentTab, onTabClick }: TabButtonProps<T>) => {
  return (
    <div className="no-animation btn-group mx-4 border-collapse md:mx-0 md:w-fit">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={classNames(
            'btn w-32 flex-1 border-r-0 !border-grey-middle last:border-r',
            currentTab === tab ? 'btn-active' : 'btn-secondary font-medium text-black'
          )}
          onClick={onTabClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabButton;
