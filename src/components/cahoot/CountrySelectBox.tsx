import { UseFormSetValue, UseFormTrigger } from 'react-hook-form';

import SelectBox from '@/components/common/SelectBox';
import { useSuspendedQuery } from '@/hooks/useSuspendedQuery';
import { api } from '@/libs/client/api';
import { CountriesType } from '@/types/cahoot';
import { Response } from '@/types/response';

interface PropsType {
  currentItem: string;
  selectItem: (item: string) => void;
  setValue?: UseFormSetValue<any>;
  trigger?: UseFormTrigger<any>;
}

// data fetching을 위한 wrapper
const CountrySelectBox = ({ currentItem, selectItem, setValue, trigger }: PropsType) => {
  const {
    data: {
      data: { result: countries },
    },
  } = useSuspendedQuery<Response<CountriesType>>(['MarketCountries'], () =>
    api.get(`markets/countries`).json()
  );

  const changeCountry = (country: string) => {
    selectItem(country); // setSelectedCountry (set state)
  };

  return (
    <>
      <SelectBox
        items={countries}
        currentItem={currentItem}
        changeItem={changeCountry}
        size="large"
        name="country"
        setValue={setValue}
        trigger={trigger}
      />
    </>
  );
};

export default CountrySelectBox;
