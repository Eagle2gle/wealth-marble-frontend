import { MouseEvent, useState } from 'react';
import { createPortal } from 'react-dom';

import Icon from './Icons';

interface PropsType {
  placeholder: string;
  container: HTMLDivElement | null;
}
const SelectBox = ({ placeholder, container }: PropsType) => {
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

  // 현재 문제점 - 셀렉트박스 클릭도 handleBlur에 잡힘 -> isOpen이 false가 되면서 selectValue 함수 동작 X
  // -> 눌러도 값 세팅이 안됨
  const handleBlur = () => {
    console.log('blur');
    setIsOpen(false);
  };

  if (!container) return <></>;

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
      {createPortal(
        <div
          className={`${
            isOpen ? 'visible' : 'invisible'
          } absolute top-20 mt-2 w-24 bg-white border border-grey rounded-lg`}
        >
          <ul className="list-none list-inside ">
            <li onClick={selectValue} className="cursor-pointer select-none p-2 hover:bg-main/50">
              대만
            </li>
            <li onClick={selectValue} className="cursor-pointer select-none p-2 hover:bg-main/50">
              일본
            </li>
          </ul>
        </div>,
        container
      )}
    </div>
  );
};

export default SelectBox;
