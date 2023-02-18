import { MouseEvent, useState } from 'react';
import { createPortal } from 'react-dom';

import Icon from './Icons';

interface SelectItem {
  index: number;
  item: string;
}

interface PropsType {
  items: SelectItem[];
  containerRef: React.RefObject<HTMLDivElement>;
  currentItem: string;
  changeItem: (item: string) => void;
  size: 'large' | 'small';
}

const SelectBox = ({ items, containerRef, currentItem, changeItem, size }: PropsType) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickToggle = (e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const onClickItem = (item: string) => {
    setIsOpen(false);
    changeItem(item);
  };

  const onBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  return (
    <div>
      <div
        onBlur={onBlur}
        tabIndex={4}
        onClick={onClickToggle}
        className={`flex ${
          size === 'large' ? 'h-12 w-36 ' : 'h-6 w-16'
        } items-center justify-between rounded-lg border border-grey px-3 `}
      >
        <span className={`truncate ${size === 'large' ? 'text-sm' : 'text-[10px]'}`}>
          {currentItem}
        </span>
        <span>
          {isOpen && <Icon.Up size={size === 'large' ? 'large' : 'small'} />}
          {!isOpen && <Icon.Down size={size === 'large' ? 'large' : 'small'} />}
        </span>
      </div>
      {containerRef.current &&
        createPortal(
          <div
            className={`${isOpen ? 'visible' : 'invisible'} ${
              size === 'large' ? 'top-12 w-36' : 'top-20 w-16'
            } absolute mt-2 rounded-lg border border-grey bg-white`}
          >
            <ul className="list-inside list-none ">
              {items.map(({ index, item }) => (
                <li
                  key={index.toString()}
                  title={item}
                  onClick={() => onClickItem(item)}
                  className={`${
                    size === 'large' ? 'text-sm' : 'text-[10px]'
                  } cursor-pointer select-none truncate rounded-lg p-2 hover:bg-main/50`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>,
          containerRef.current
        )}
    </div>
  );
};

export default SelectBox;
