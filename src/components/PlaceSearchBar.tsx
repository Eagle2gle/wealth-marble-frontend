import { useRef } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { UseFormSetValue } from 'react-hook-form';

interface PropsType {
  name: string;
  setValue: UseFormSetValue<any>;
}

const PlaceSearchBar = ({ name, setValue }: PropsType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // 자동완성 목록에서 주소 선택 시 나라명, 우편번호를 제외한 주소 생성
  const summarizeAddress = (addressComponents: google.maps.GeocoderAddressComponent[]) => {
    let address = '';

    addressComponents
      .filter((item) => !item.types.includes('country') && !item.types.includes('postal_code'))
      .reverse()
      .map((item) => (address += `${item.long_name} `));

    setValue(name, address.trim());
  };

  // 사용자 입력 주소 form value 세팅
  const onInput = () => {
    const inputText = inputRef.current?.value;
    if (!inputText) {
      return;
    }
    setValue(name, inputText.trim());
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
      onChange={onInput}
      options={{
        types: ['(regions)'],
        componentRestrictions: { country: 'kr' },
        fields: ['address_components'],
      }}
      className="w-96 rounded-lg border border-solid border-black/20  p-3 focus:outline-main"
    />
  );
};

export default PlaceSearchBar;
