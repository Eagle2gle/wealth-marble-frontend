import Icon from '@/components/common/Icons';

interface PropsType {
  readonly socialType: string;
}

const SocialLoginBtn = ({ socialType }: PropsType) => {
  return (
    <button className="btn w-96 gap-8 bg-transparent hover:bg-main hover:text-white text-black font-bold border-black/10 hover:border-transparent normal-case">
      {socialType === 'google' && <Icon.Google />}
      {/* 첫번째 글자를 대문자로 변환 */}
      {socialType.charAt(0).toUpperCase() + socialType.slice(1)}로 계속하기
    </button>
  );
};

export default SocialLoginBtn;
