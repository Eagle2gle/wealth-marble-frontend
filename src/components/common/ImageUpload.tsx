import { useState, useRef } from 'react';

import Image from 'next/image';

import Icon from '@/components/common/Icons';

interface PropsType {
  id: string;
  name?: string;
}

const ImageUpload = ({ id, name = 'inputFile' }: PropsType) => {
  const imgRef = useRef<HTMLInputElement>(null);
  const [imgSrcList, setImgSrcList] = useState<string[]>([]);
  const limit = 5;

  const inputImgFile = () => {
    const files = imgRef.current?.files;

    if (!files) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = (e) => {
      const result = e.target?.result as string;
      setImgSrcList([...imgSrcList, result]);
    };
  };

  const handleRemoveImage = (index: number) => {
    setImgSrcList((imgSrc) => {
      return imgSrc.filter((val, idx) => idx !== index);
    });
  };

  return (
    <div className="flex basis-8 w-full overflow-x-auto gap-2">
      {/* 이미지 업로드 */}
      {limit !== imgSrcList?.length ? (
        <div className="flex-none bg-grey border border-solid border-black/20 w-32 h-32 rounded-lg">
          <label
            htmlFor={id}
            className="w-48 h-48 relative cursor-pointer rounded-md font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
          >
            <div className="flex flex-col gap-1 items-center justify-center w-full h-full">
              <div>
                <Icon.Camera />
              </div>
              <span>
                {imgSrcList.length}/{limit}
              </span>
            </div>
          </label>
          <input
            id={id}
            name={name}
            type="file"
            accept="image/*"
            ref={imgRef}
            onChange={inputImgFile}
            className="sr-only"
          />
        </div>
      ) : null}
      {/* 이미지 미리보기 */}
      {imgSrcList?.map((el, i) => {
        return (
          <div key={i} className="flex flex-none relative w-32 h-32 items-center justify-center">
            <button
              type="button"
              className="absolute top-0 right-0 rounded-lg mt-1 mr-1 bg-black/50 text-white w-8 h-8 flex justify-center items-center"
              onClick={() => handleRemoveImage(i)}
            >
              <Icon.XMark />
            </button>
            <Image
              alt={'예상 이미지'}
              src={el}
              className="w-full h-full rounded-lg object-cover"
              width={128}
              height={128}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ImageUpload;
