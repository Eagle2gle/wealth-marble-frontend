import { useForm, FieldErrors } from 'react-hook-form';

import DateRangeInput from '@/components/common/DateRangeInput';
import FormItem from '@/components/common/FormItem';
import ImageUpload from '@/components/common/ImageUpload';
import Layout from '@/components/common/Layout';
import NumberInput from '@/components/common/NumberInput';
import RadioBtn from '@/components/common/RadioBtn';
import TextArea from '@/components/common/TextArea';
import TextInput from '@/components/common/TextInput';
import PlaceSearchBar from '@/components/PlaceSearchBar';
// import Map from '@/components/Map';

const positionOption = [
  { value: 'OCEAN', label: '바다' },
  { value: 'MOUNTAIN', label: '산' },
  { value: 'DOWNTOWN', label: '도심' },
];

const typeOption = [
  { value: 'RESORT', label: '휴양지' },
  { value: 'HOTEL', label: '호텔' },
  { value: 'GUESTHOUSE', label: '게스트하우스' },
];

export interface FormDataType {
  title: string;
  shortDescription: string;
  images: string[];
  themeLocation: string;
  themeBuilding: string;
  location: string;
  expectedMonth: string;
  descritption: string;
  stockStart: string;
  stockEnd: string;
  expectedTotalCost: string;
  stockPrice: string;
  stockNum: string;
}

export default function CreateCahoot() {
  const { register, handleSubmit, setValue } = useForm<FormDataType>();

  const onSubmit = (data: FormDataType) => {
    console.log(data);
    // TODO: POST form data
  };

  const onErrors = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <Layout hideHeaderOnMobile hideBottomBar>
      <section className="flex flex-col gap-2.5 max-md:hidden bg-main text-white px-10 pt-12 pb-6">
        <h1 className="text-2xl font-semibold">공모 생성</h1>
        <p className="text-xs font-medium">
          공모를 위한 휴양지 건설 계획서를 상세하게 작성해주세요.
        </p>
      </section>
      <article className="p-5 w-full">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit, onErrors)}>
          {/* 휴양지명 */}
          <FormItem id="title" label="휴양지명" required={true}>
            <div className="px-2">
              <TextInput
                id="title"
                placeholder="5~20 글자로 작성해주세요."
                required={true}
                register={register('title')}
              />
            </div>
          </FormItem>
          {/* 간단한 소개 */}
          <FormItem id="shortDescription" label="간단한 소개" required={true}>
            <div className="px-2">
              <TextArea
                id="shortDescription"
                placeholder="휴양지에 대한 간단한 소개를 작성해주세요."
                required={true}
                register={register('shortDescription')}
              />
            </div>
          </FormItem>
          {/* 예상 이미지 */}
          <FormItem id="images" label="예상 이미지" required={true}>
            <div className="px-2">
              <ImageUpload id="images" name="images" setValue={setValue} />
            </div>
          </FormItem>
          {/* 휴양지 테마 */}
          <FormItem id="theme" label="휴양지 테마" required={true}>
            <div className="px-2">
              <p className="text-sm font-semibold text-black my-2">위치</p>
              <RadioBtn
                id="themeLocation"
                name="themeLocation"
                option={positionOption}
                register={register('themeLocation')}
              />
              <p className="text-sm font-semibold text-black mt-4 mb-2">건물 유형</p>
              <RadioBtn
                id="themeBuilding"
                name="themeBuilding"
                option={typeOption}
                register={register('themeBuilding')}
              />
            </div>
          </FormItem>
          {/* 위치 */}
          <FormItem id="location" label="위치" required={true}>
            <div className="px-2">
              {/* TODO: Loading 일 때 처리 */}
              <PlaceSearchBar register={register('location')} />
              {/* <Map /> */}
            </div>
          </FormItem>
          {/* 건설 진행 예상 시간 */}
          <FormItem id="expectedMonth" label="건설 진행 예상 시간" required={true}>
            <div className="flex gap-4 items-center px-2">
              <span>공모 완료 후</span>
              <NumberInput size="small" min={0} name="expectedMonth" setValue={setValue} />
              <span>month</span>
            </div>
          </FormItem>
          {/* 아이디어 설명 */}
          <FormItem id="descritption" label="아이디어 설명" required={true}>
            <div className="px-2">
              <TextArea
                id="descritption"
                placeholder="최대한 상세히 작성해야 공모에 도움이 됩니다."
                required={true}
                register={register('descritption')}
              />
            </div>
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
            <div className="flex gap-4 items-center px-2">
              <NumberInput size="large" min={0} name="expectedTotalCost" setValue={setValue} />
              <span>만원</span>
            </div>
          </FormItem>
          {/* 발행 주식 수량 및 가격 */}
          <FormItem id="issuedStocks" label="발행 주식 수량 및 가격" required={true}>
            <div className="flex flex-wrap gap-10 px-2">
              <div className="basis-5/12">
                <p className="text-sm font-semibold text-black my-2">1주 별 가격</p>
                <div className="flex gap-4 items-center">
                  <NumberInput size="large" min={0} name="stockPrice" setValue={setValue} />
                  <span>원</span>
                </div>
              </div>
              <div className="basis-5/12">
                <p className="text-sm font-semibold text-black my-2">발행 주식 수</p>
                <div className="flex gap-4 items-center">
                  <NumberInput size="large" min={1} name="stockNum" setValue={setValue} />
                  <span>주</span>
                </div>
              </div>
            </div>
          </FormItem>
          <button
            type="submit"
            className="my-16 self-center w-36 btn bg-main border-none hover:bg-red"
          >
            등록하기
          </button>
        </form>
      </article>
    </Layout>
  );
}
