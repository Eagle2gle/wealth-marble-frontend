import { useRef, useState } from 'react';
import { useForm, FieldErrors } from 'react-hook-form';

import { useRouter } from 'next/router';

import DateRangeInput from '@/components/common/DateRangeInput';
import FormItem from '@/components/common/FormItem';
import ImageUpload from '@/components/common/ImageUpload';
import Layout from '@/components/common/Layout';
import NumberInput from '@/components/common/NumberInput';
import RadioBtn from '@/components/common/RadioBtn';
import SelectBox from '@/components/common/SelectBox';
import TextArea from '@/components/common/TextArea';
import TextInput from '@/components/common/TextInput';
import PlaceSearchBar from '@/components/PlaceSearchBar';
import wrapper from '@/store';
// import Map from '@/components/Map';

const positionOption = [
  { value: 'BEACH', label: '바다' },
  { value: 'FOREST', label: '산' },
  { value: 'DOWNTOWN', label: '도심' },
];

const typeOption = [
  { value: 'VACATION_SPOT', label: '휴양지' },
  { value: 'HOTEL', label: '호텔' },
  { value: 'GUEST_HOUSE', label: '게스트하우스' },
];

export interface FormDataType {
  title: string;
  shortDescription: string;
  images: Blob[];
  themeLocation: string;
  themeBuilding: string;
  country: string;
  location: string;
  expectedMonth: number;
  description: string;
  stockStart: string;
  stockEnd: string;
  expectedTotalCost: number;
  stockPrice: number;
  stockNum: number;
  expectedRateOfReturn: number;
}

const selectItems = [
  { index: 1, item: '대한민국' },
  { index: 2, item: '미국' },
];

export default function CreateCahoot() {
  const router = useRouter();
  const selectBoxContainer = useRef<HTMLDivElement>(null);
  const [selectedCountry, setSelectedCountry] = useState('국가'); // 휴양지 위치
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<FormDataType>();

  const onSubmit = (data: FormDataType) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (key === 'images') {
        value.forEach((img: Blob) => formData.append(key, img));
      } else {
        formData.append(key, value);
      }
    }

    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/cahoots`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        router.push('/');
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onErrors = (errors: FieldErrors) => {
    console.log(errors);
  };

  const changeCountry = (country: string) => {
    setSelectedCountry(country);
  };

  return (
    <Layout hideHeaderOnMobile hideBottomBar>
      <section className="flex flex-col gap-2.5 bg-main px-10 pt-12 pb-6 text-white max-md:hidden">
        <h1 className="text-2xl font-semibold">공모 생성</h1>
        <p className="text-xs font-medium">
          공모를 위한 휴양지 건설 계획서를 상세하게 작성해주세요.
        </p>
      </section>
      <article className="w-full p-5">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit, onErrors)}>
          {/* 휴양지명 */}
          <FormItem id="title" label="휴양지명" required={true}>
            <div className="px-2">
              <TextInput
                id="title"
                placeholder="5~20 글자로 작성해주세요."
                register={register('title', {
                  minLength: 5,
                  maxLength: 15,
                  required: true,
                })}
              />
              {errors.title && errors.title.type === 'minLength' && (
                <p className="p-1 text-red">5자 이상 입력해주세요.</p>
              )}
              {errors.title && errors.title.type === 'maxLength' && (
                <p className="p-1 text-red">15자 이하로 입력해주세요.</p>
              )}
              {errors.title && errors.title.type === 'required' && (
                <p className="p-1 text-red">휴양지명을 입력해주세요.</p>
              )}
            </div>
          </FormItem>
          {/* 간단한 소개 */}
          <FormItem id="shortDescription" label="간단한 소개" required={true}>
            <div className="px-2">
              <TextArea
                id="shortDescription"
                placeholder="휴양지에 대한 간단한 소개를 작성해주세요.(최소 10자, 최대 50자)"
                register={register('shortDescription', {
                  minLength: 10,
                  maxLength: 50,
                  required: true,
                })}
              />
              {errors.shortDescription && errors.shortDescription.type === 'minLength' && (
                <p className="p-1 text-red">10자 이상 입력해주세요.</p>
              )}
              {errors.shortDescription && errors.shortDescription.type === 'maxLength' && (
                <p className="p-1 text-red">50자 이하로 입력해주세요.</p>
              )}
              {errors.shortDescription && errors.shortDescription.type === 'required' && (
                <p className="p-1 text-red">휴양지에 대한 간단한 소개를 입력해주세요.</p>
              )}
            </div>
          </FormItem>
          {/* 예상 이미지 */}
          <FormItem id="images" label="예상 이미지" required={true}>
            <div className="px-2">
              <input
                type="hidden"
                {...register('images', {
                  required: true,
                })}
              />
              <ImageUpload id="images" name="images" setValue={setValue} trigger={trigger} />
            </div>
            {errors.images && errors.images.type === 'required' && (
              <p className="p-1 text-red">예상 이미지를 선택해주세요.</p>
            )}
          </FormItem>
          {/* 휴양지 테마 */}
          <FormItem id="theme" label="휴양지 테마" required={true}>
            <div className="px-2">
              <p className="my-2 text-sm font-semibold text-black">위치</p>
              <RadioBtn
                id="themeLocation"
                name="themeLocation"
                option={positionOption}
                register={register('themeLocation', { required: true })}
              />
              <p className="mt-4 mb-2 text-sm font-semibold text-black">건물 유형</p>
              <RadioBtn
                id="themeBuilding"
                name="themeBuilding"
                option={typeOption}
                register={register('themeBuilding', { required: true })}
              />
            </div>
            {(errors.themeLocation?.type === 'required' ||
              errors.themeBuilding?.type === 'required') && (
              <p className="p-1 text-red">휴양지 테마를 선택해주세요.</p>
            )}
          </FormItem>
          {/* 위치 */}
          <FormItem id="location" label="위치" required={true}>
            <div ref={selectBoxContainer} className="relative flex gap-4 px-2">
              <input
                id="country"
                type="hidden"
                {...register('country', {
                  required: true,
                })}
              />
              <SelectBox
                items={selectItems}
                containerRef={selectBoxContainer}
                currentItem={selectedCountry}
                changeItem={changeCountry}
                size="large"
                name="country"
                setValue={setValue}
                trigger={trigger}
              />
              {/* TODO: Loading 일 때 처리 */}
              <input
                id="location"
                type="hidden"
                {...register('location', {
                  required: true,
                })}
              />
              <PlaceSearchBar
                name="location"
                country={selectedCountry}
                setValue={setValue}
                trigger={trigger}
              />
              {/* <Map /> */}
            </div>
            {(errors.country?.type === 'required' || errors.location?.type === 'required') && (
              <p className="p-1 text-red">휴양지의 위치를 입력해주세요.</p>
            )}
          </FormItem>
          {/* 건설 진행 예상 시간 */}
          <FormItem id="expectedMonth" label="건설 진행 예상 시간" required={true}>
            <div className="flex items-center gap-4 px-2">
              <span>공모 완료 후</span>
              <NumberInput
                size="small"
                min={0}
                max={120}
                name="expectedMonth"
                setValue={setValue}
              />
              <span>month</span>
            </div>
          </FormItem>
          {/* 아이디어 설명 */}
          <FormItem id="description" label="아이디어 설명" required={true}>
            <div className="px-2">
              <TextArea
                id="description"
                placeholder="최대한 상세히 작성해야 공모에 도움이 됩니다."
                register={register('description', {
                  minLength: 5,
                  maxLength: 4000,
                  required: true,
                })}
              />
            </div>
            {errors.description && errors.description.type === 'minLength' && (
              <p className="p-1 text-red">5자 이상 입력해주세요.</p>
            )}
            {errors.description && errors.description.type === 'maxLength' && (
              <p className="p-1 text-red">4000자 이하로 입력해주세요.</p>
            )}
            {errors.description && errors.description.type === 'required' && (
              <p className="p-1 text-red">아이디어 설명을 입력해주세요.</p>
            )}
          </FormItem>
          {/* 공모 진행 기간 */}
          <FormItem id="stockDurationRange" label="공모 진행 기간" required={true}>
            <div className="px-2">
              <DateRangeInput
                startDateName={'stockStart'}
                endDateName={'stockEnd'}
                setValue={setValue}
              />
            </div>
          </FormItem>
          {/* 전체 건설 지출 예상 금액 */}
          <FormItem id="expectedTotalCost" label="전체 건설 지출 예상 금액" required={false}>
            <div className="flex items-center gap-4 px-2">
              <NumberInput
                size="large"
                min={0}
                max={100000000}
                name="expectedTotalCost"
                setValue={setValue}
              />
              <span>만원</span>
            </div>
          </FormItem>
          {/* 예상 수익률 */}
          <FormItem id="expectedRateOfReturn" label="예상 수익률" required={true}>
            <div className="flex items-center gap-4 px-2">
              <NumberInput
                size="large"
                min={100}
                max={100000}
                name="expectedRateOfReturn"
                setValue={setValue}
              />
              <span>%</span>
            </div>
          </FormItem>
          {/* 발행 주식 수량 및 가격 */}
          <FormItem id="issuedStocks" label="발행 주식 수량 및 가격" required={true}>
            <div className="flex flex-wrap gap-10 px-2">
              <div className="basis-5/12">
                <p className="my-2 text-sm font-semibold text-black">1주 별 가격</p>
                <div className="flex items-center gap-4">
                  <NumberInput
                    size="large"
                    min={1000}
                    max={10000000}
                    unit={1000}
                    name="stockPrice"
                    setValue={setValue}
                  />
                  <span>원</span>
                </div>
              </div>
              <div className="basis-5/12">
                <p className="my-2 text-sm font-semibold text-black">발행 주식 수</p>
                <div className="flex items-center gap-4">
                  <NumberInput
                    size="large"
                    min={0}
                    max={10000}
                    unit={100}
                    name="stockNum"
                    setValue={setValue}
                  />
                  <span>주</span>
                </div>
              </div>
            </div>
          </FormItem>
          <button
            type="submit"
            className="btn my-16 w-36 self-center border-none bg-main hover:bg-red"
          >
            등록하기
          </button>
        </form>
      </article>
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(() => async () => {
  return {
    props: {},
  };
});
