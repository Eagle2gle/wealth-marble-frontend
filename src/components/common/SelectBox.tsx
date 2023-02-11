import { MouseEvent, useState } from 'react';
import { createPortal } from 'react-dom';

import Icon from './Icons';

interface PropsType {
  placeholder: string;
  containerRef: React.RefObject<HTMLDivElement>;
}
const SelectBox = ({ placeholder, containerRef }: PropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(placeholder);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const selectValue = (e: MouseEvent) => {
    const eventTarget = e.target as HTMLElement;

    console.log('click value');
    setIsOpen(false);
    setSelectedValue(eventTarget.innerText);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  return (
    <div className="w-24">
      <div
        onBlur={handleBlur}
        tabIndex={4}
        onClick={handleClick}
        className="flex justify-between border border-grey w-24 rounded-lg px-3 py-2"
      >
        <span>{selectedValue}</span>
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
            } absolute top-20 mt-6 w-24 rounded-lg border border-grey bg-white`}
          >
            <ul className="list-inside list-none ">
              <li
                onClick={selectValue}
                className="cursor-pointer select-none rounded-lg p-2 hover:bg-main/50"
              >
                대만
              </li>
              <li
                onClick={selectValue}
                className="cursor-pointer select-none rounded-lg p-2 hover:bg-main/50"
              >
                일본
              </li>
            </ul>
          </div>,
          containerRef.current
        )}
    </div>
  );
};

export default SelectBox;
