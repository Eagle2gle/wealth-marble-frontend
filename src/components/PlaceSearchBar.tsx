import { useRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

interface PropsType {
  register?: UseFormRegisterReturn;
}

const PlaceSearchBar = ({ register }: PropsType) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const onPlacesChanged = () => {
    const searchText = searchRef.current?.value;
    // console.log(searchText);
    // TODO: 모달 + 지도 연동
  };
  return (
    <LoadScript googleMapsApiKey="AIzaSyBtxP6C_wyzDUffkRlJntn9pDY-MV26QG0" libraries={['places']}>
      <StandaloneSearchBox onPlacesChanged={onPlacesChanged}>
        <input
          ref={searchRef}
          type="text"
          placeholder="휴양지 위치를 입력하세요."
          className="border border-solid border-black/20 rounded-lg focus:outline-main  p-3 w-96"
          {...register}
        />
      </StandaloneSearchBox>
    </LoadScript>
  );
};

export default PlaceSearchBar;
