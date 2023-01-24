import DateRangeInput from '@/components/common/DateRangeInput';
import ImageUpload from '@/components/common/ImageUpload';
import Layout from '@/components/common/Layout';
import NumberInput from '@/components/common/NumberInput';
import RadioBtn from '@/components/common/RadioBtn';
import TextArea from '@/components/common/TextArea';
import TextInput from '@/components/common/TextInput';
// import Map from '@/components/Map';
import PlaceSearchBar from '@/components/PlaceSearchBar';

const positionOption = [
  { value: 'ocean', label: '바다' },
  { value: 'mountain', label: '산' },
  { value: 'city', label: '도심' },
];

const typeOption = [
  { value: 'resort', label: '휴양지' },
  { value: 'hotel', label: '호텔' },
  { value: 'guestHouse', label: '게스트하우스' },
];

export default function CreateCahoot() {
  return (
    <Layout hideHeaderOnMobile hideBottomBar>
      <section className="flex flex-col gap-2.5 max-md:hidden bg-main text-white px-10 pt-12 pb-6">
        <h1 className="text-2xl font-semibold">공모 생성</h1>
        <p className="text-xs font-medium">
          공모를 위한 휴양지 건설 계획서를 상세하게 작성해주세요.
        </p>
      </section>
      <article className="p-5 w-full">
        <form className="flex flex-col gap-8">
          {/* 휴양지명 */}
          <div>
            <div>
              <label htmlFor="name" className="block mb-2 text-base font-semibold text-black">
                <span className="text-red">* </span>
                <span>휴양지명</span>
              </label>
              <div className="px-2">
                <TextInput id="name" placeholder="5~20 글자로 작성해주세요." required />
              </div>
            </div>
          </div>
          {/* 간단한 소개 */}
          <div>
            <div>
              <label
                htmlFor="brief-introduction"
                className="block mb-2 text-base font-semibold text-black"
              >
                <span className="text-red">* </span>
                <span>간단한 소개</span>
              </label>
              <div className="px-2">
                <TextArea
                  id="brief-introduction"
                  placeholder="휴양지에 대한 간단한 소개를 작성해주세요."
                  required={true}
                />
              </div>
            </div>
          </div>
          {/* 예상 이미지 */}
          <div>
            <div>
              <label
                htmlFor="expected-img"
                className="block mb-2 text-base font-semibold text-black"
              >
                <span className="text-red">* </span>
                <span>예상 이미지</span>
              </label>
              <div className="px-2">
                <ImageUpload id="expected-img" name="expectedImg" />
              </div>
            </div>
          </div>
          {/* 휴양지 테마 */}
          <div>
            <div>
              <label htmlFor="theme" className="block mb-2 text-base font-semibold text-black">
                <span className="text-red">* </span>
                <span>휴양지 테마</span>
              </label>
              <div className="px-2">
                <p className="text-sm font-semibold text-black my-2">위치</p>
                <RadioBtn id="theme-potision" name="theme-position" option={positionOption} />
                <p className="text-sm font-semibold text-black mt-4 mb-2">건물 유형</p>
                <RadioBtn id="theme-type" name="theme-type" option={typeOption} />
              </div>
            </div>
          </div>
          {/* 위치 */}
          <div>
            <div>
              <label htmlFor="position" className="block mb-2 text-base font-semibold text-black">
                <span className="text-red">* </span>
                <span>위치</span>
              </label>
              <div className="px-2">
                <PlaceSearchBar />
                {/* <Map /> */}
              </div>
            </div>
          </div>
          {/* 건설 진행 예상 시간 */}
          <div>
            <div>
              <label
                htmlFor="expected-construction-time"
                className="block mb-2 text-base font-semibold text-black"
              >
                <span className="text-red">* </span>
                <span>건설 진행 예상 시간</span>
              </label>
              <div className="flex gap-4 items-center px-2">
                <span>공모 완료 후</span>
                <NumberInput size="small" />
                <span>month</span>
              </div>
            </div>
          </div>
          {/* 아이디어 설명 */}
          <div>
            <div>
              <label htmlFor="idea" className="block mb-2 text-base font-semibold text-black">
                <span className="text-red">* </span>
                <span>아이디어 설명</span>
              </label>
              <div className="px-2">
                <TextArea
                  id="idea"
                  placeholder="최대한 상세히 작성해야 공모에 도움이 됩니다."
                  required={true}
                />
              </div>
            </div>
          </div>
          {/* 공모 진행 기간 */}
          <div>
            <div>
              <label
                htmlFor="cahoot-duration"
                className="block mb-2 text-base font-semibold text-black"
              >
                <span className="text-red">* </span>
                <span>공모 진행 기간</span>
              </label>
              <div className="px-2">
                <DateRangeInput />
              </div>
            </div>
          </div>
          {/* 전체 건설 지출 예상 금액 */}
          <div>
            <div>
              <label
                htmlFor="expected-construction-expenditure"
                className="block mb-2 text-base font-semibold text-black"
              >
                <span>전체 건설 지출 예상 금액</span>
              </label>
              <div className="flex gap-4 items-center px-2">
                <NumberInput size="large" />
                <span>만원</span>
              </div>
            </div>
          </div>
          {/* 발행 주식 수량 및 가격 */}
          <div>
            <div>
              <label
                htmlFor="issued-stocks"
                className="block mb-2 text-base font-semibold text-black"
              >
                <span className="text-red">* </span>
                <span>발행 주식 수량 및 가격</span>
              </label>
              <div className="flex flex-wrap gap-10 px-2">
                <div className="basis-5/12">
                  <p className="text-sm font-semibold text-black my-2">1주 별 가격</p>
                  <div className="flex gap-4 items-center">
                    <NumberInput size="large" />
                    <span>원</span>
                  </div>
                </div>
                <div className="basis-5/12">
                  <p className="text-sm font-semibold text-black my-2">발행 주식 수</p>
                  <div className="flex gap-4 items-center">
                    <NumberInput size="large" />
                    <span>주</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <input
            type="submit"
            value="등록하기"
            className="my-16 self-center w-36 btn bg-main border-none hover:bg-red"
          />
        </form>
      </article>
    </Layout>
  );
}
