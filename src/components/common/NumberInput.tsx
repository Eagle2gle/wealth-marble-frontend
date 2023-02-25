import React, { useState } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { FormDataType } from '@/pages/cahoots/create';

interface PropsType {
  size: 'small' | 'large';
  min: number;
  max: number;
  unit?: number;
  value?: number;
  name: string;
  setValue: UseFormSetValue<FormDataType>;
}

const NumberInput = ({ size, min = 0, max = 100, unit = 1, name, setValue }: PropsType) => {
  const [num, setNum] = useState<number>(min);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputNum = Number(e.target.value);

    if (isNaN(inputNum) || inputNum < 0) {
      return;
    }

    if (inputNum < min) {
      inputNum = min;
    } else if (inputNum > max) {
      inputNum = max;
    }

    setNum(inputNum);
    setValue(name, inputNum);
  };

  const onClickPlus = () => {
    const newVal = num + unit;

    if (newVal > max) {
      return;
    }
    setNum(newVal);
    setValue(name, newVal);
  };

  const onClickMinus = () => {
    const newVal = num - unit;

    if (newVal < min) {
      return;
    }
    setNum(newVal);
    setValue(name, newVal);
  };

  return (
    <div className={`${size === 'small' ? 'w-28' : 'w-60'} flex h-10 flex-wrap`}>
      <div className={`${size === 'small' ? 'w-4/6' : 'w-5/6'} flex h-full`}>
        <input
          type="text"
          value={num}
          className="text-gray-900 focus:border-gray-600 w-full rounded-l-md border border-r-0 border-black/20 bg-white text-center text-sm outline-main"
          onChange={handleInput}
        />
      </div>
      <div className={`${size === 'small' ? 'w-2/6' : 'w-1/6'} flex h-full flex-col`}>
        <button
          type="button"
          className="text-md h-1/2 rounded-tr-md border border-b-0 border-black/20 px-3 text-center font-semibold leading-none text-black/20 hover:border-main hover:bg-main focus:outline-none"
          onClick={onClickPlus}
        >
          +
        </button>
        <button
          type="button"
          className="text-md h-1/2 rounded-br-md border border-black/20 px-3 text-center font-semibold leading-none text-black/20 hover:border-main hover:bg-main focus:outline-none"
          onClick={onClickMinus}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
