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
}
const SelectBox = ({ items, containerRef, currentItem, changeItem }: PropsType) => {
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
        className="flex	h-6 w-16 items-center justify-between rounded-lg border border-grey px-3 "
      >
        <span className="truncate text-[10px]">{currentItem}</span>
        <span>
          {isOpen && <Icon.Up></Icon.Up>}
          {!isOpen && <Icon.Down></Icon.Down>}
        </span>
      </div>
      {containerRef.current &&
        createPortal(
          <div
            className={`${
              isOpen ? 'visible' : 'invisible'
            } absolute top-20 mt-2 w-24 rounded-lg border border-grey bg-white`}
          >
            <ul className="list-inside list-none ">
              {items.map(({ index, item }) => (
                <li
                  key={index.toString()}
                  onClick={() => onClickItem(item)}
                  className="cursor-pointer select-none truncate rounded-lg p-2 text-[10px] hover:bg-main/50"
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
