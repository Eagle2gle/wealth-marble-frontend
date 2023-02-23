import { useState, useRef } from 'react';
import { UseFormSetValue, UseFormTrigger } from 'react-hook-form';

import Image from 'next/image';

import Icon from '@/components/common/Icons';

interface PropsType {
  id: string;
  name: string;
  setValue: UseFormSetValue<any>;
  trigger: UseFormTrigger<any>;
}

const ImageUpload = ({ id, name, setValue, trigger }: PropsType) => {
  const imgRef = useRef<HTMLInputElement>(null);
  const [imgSrcList, setImgSrcList] = useState<string[]>([]);
  const [imgFileList, setImgFileList] = useState<Blob[]>([]);

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
      const newImgSrcList = [...imgSrcList, result];
      const newImgFileList = [...imgFileList, files[0]];

      setImgSrcList(newImgSrcList);
      setImgFileList(newImgFileList);
      setValue(name, newImgFileList);
      trigger(name);
    };
  };

  const handleRemoveImage = (index: number) => {
    const newImgSrcList = imgSrcList.filter((val, idx) => idx !== index);
    const newImgFileList = imgFileList.filter((val, idx) => idx !== index);

    setImgSrcList(newImgSrcList);
    setImgFileList(newImgFileList);
    setValue(name, newImgFileList);
    trigger(name);
  };

  return (
    <div className="flex w-full basis-8 gap-2 overflow-x-auto">
      {/* 이미지 업로드 */}
      {limit !== imgSrcList?.length ? (
        <div className="h-32 w-32 flex-none rounded-lg border border-solid border-black/20 bg-grey">
          <label
            htmlFor={id}
            className="text-indigo-600 focus-within:ring-indigo-500 hover:text-indigo-500 relative h-48 w-48 cursor-pointer rounded-md font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2"
          >
            <div className="flex h-full w-full flex-col items-center justify-center gap-1">
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
            type="file"
            accept="image/*"
            className="sr-only"
            ref={imgRef}
            onChange={inputImgFile}
          />
        </div>
      ) : null}
      {/* 이미지 미리보기 */}
      {imgSrcList?.map((el, i) => {
        return (
          <div key={i} className="relative flex h-32 w-32 flex-none items-center justify-center">
            <button
              type="button"
              className="absolute top-0 right-0 mt-1 mr-1 flex h-8 w-8 items-center justify-center rounded-lg bg-black/50 text-white"
              onClick={() => handleRemoveImage(i)}
            >
              <Icon.XMark />
            </button>
            <Image
              alt={'예상 이미지'}
              src={el}
              className="h-full w-full rounded-lg object-cover"
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
