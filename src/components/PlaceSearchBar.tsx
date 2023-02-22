import { KeyboardEvent, useRef } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { UseFormSetValue, UseFormTrigger } from 'react-hook-form';

interface PropsType {
  name: string;
  country: string; // 국가코드
  setValue: UseFormSetValue<any>;
  trigger: UseFormTrigger<any>;
}

const PlaceSearchBar = ({ name, country, setValue, trigger }: PropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // 자동완성 목록에서 주소 선택 시 나라명, 우편번호를 제외한 주소 생성
  const summarizeAddress = (addressComponents: google.maps.GeocoderAddressComponent[]) => {
    let address = '';

    addressComponents
      .filter((item) => !item.types.includes('country') && !item.types.includes('postal_code'))
      .reverse()
      .map((item) => (address += `${item.long_name} `));

    setValue(name, address.trim());
    trigger(name);
  };

  // 사용자 입력 주소 form value 세팅
  const onInput = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }

    const inputText = inputRef.current?.value;
    // 공백인 경우 리턴하면 X
    if (inputText === undefined) {
      return;
    }
    setValue(name, inputText.trim());
    trigger(name);
  };

  // 국가 코드(ISO 2자리코드) 반환
  // TODO: 국가 목록 API 나온 뒤 수정 예정
  const getCountryCode = (countryName: string) => {
    if (countryName === '대한민국') return 'kr';
    else if (countryName === '미국') return 'us';
    return 'kr';
  };

  return (
    <Autocomplete
      ref={inputRef}
      apiKey={'AIzaSyBtxP6C_wyzDUffkRlJntn9pDY-MV26QG0'}
      onPlaceSelected={(place) => {
        const addressComponents = place?.address_components;
        if (!addressComponents) {
          return;
        }
        summarizeAddress(addressComponents);
      }}
      onKeyDown={onInput}
      options={{
        types: ['(regions)'],
        componentRestrictions: { country: getCountryCode(country) },
        fields: ['address_components'],
      }}
      className="h-12 w-96 rounded-lg border border-solid border-black/20 p-3 text-sm focus:outline-main"
    />
  );
};

export default PlaceSearchBar;
