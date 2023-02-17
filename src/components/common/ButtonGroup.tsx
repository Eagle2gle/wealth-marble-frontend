import classNames from '@/utils/classnames';

interface PropsType {
  items: readonly string[];
  currentItem: string;
  changeItem: (item: string) => void;
}

const ButtonGroup = ({ items, currentItem, changeItem }: PropsType) => {
  const onClickButton = (item: string) => {
    changeItem(item);
  };

  return (
    <div className="flex h-6 gap-1.5">
      {items.map((item, index) => (
        <button
          key={index}
          title={item}
          className={classNames(
            'w-12 truncate rounded-lg px-1 text-[10px]',
            currentItem === item
              ? 'bg-main text-white'
              : 'btn-secondary border border-grey bg-white font-medium text-black/60'
          )}
          onClick={() => onClickButton(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
