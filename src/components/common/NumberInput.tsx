import { useState } from 'react';

interface PropsType {
  size: 'small' | 'large';
  value?: number;
}

// TODO: value -> 기본값 지정 시 필요할 수 있어서 놔둠
const NumberInput = ({ size, value }: PropsType) => {
  const [num, setNum] = useState<number>(0);

  return (
    <div className={`${size === 'small' ? 'w-28' : 'w-60'} flex flex-wrap h-10`}>
      <div className={`${size === 'small' ? 'w-4/6' : 'w-5/6'} flex h-full`}>
        <input
          type="text"
          value={num || ''}
          className="outline-main bg-white text-sm text-gray-900 text-center border border-black/20 focus:border-gray-600 border-r-0 rounded-l-md w-full"
          onChange={(e) => {
            setNum(Number(e.target.value));
          }}
        />
      </div>
      <div className={`${size === 'small' ? 'w-2/6' : 'w-1/6'} flex flex-col h-full`}>
        <button
          type="button"
          className="h-1/2 text-black/20 text-center text-md font-semibold rounded-tr-md px-3 focus:outline-none border border-b-0 border-black/20 hover:border-main hover:bg-main leading-none"
          onClick={() => setNum(num + 1)}
        >
          +
        </button>
        <button
          type="button"
          className="h-1/2 text-black/20 text-center text-md font-semibold rounded-br-md px-3 focus:outline-none border border-black/20 hover:border-main hover:bg-main leading-none"
          onClick={() => setNum(num - 1)}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
