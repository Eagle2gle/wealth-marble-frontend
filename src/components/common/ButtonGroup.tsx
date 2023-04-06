import classNames from '@/utils/classnames';

interface PropsType<T> {
  items: readonly T[];
  currentItem: T;
  changeItem: (item: T) => void;
  buttonSize: 'large' | 'small';
}

const ButtonGroup = <T extends string>({
  items,
  currentItem,
  changeItem,
  buttonSize,
}: PropsType<T>) => {
  const onClickButton = (item: T) => {
    changeItem(item);
  };

  return (
    <div className="flex h-6 gap-1.5">
      {items.map((item, index) => (
        <button
          key={index}
          title={item}
          className={classNames(
            'truncate rounded-lg px-1 text-[10px]',
            buttonSize === 'large' ? 'w-24' : 'w-12',
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
