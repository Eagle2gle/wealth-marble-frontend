import Icon from '@/components/common/Icons';

type SocialType = 'Google';

interface PropsType {
  readonly socialType: SocialType;
}

const SocialLoginBtn = ({ socialType }: PropsType) => {
  return (
    <button className="btn w-96 gap-8 bg-transparent hover:bg-main hover:text-white text-black font-bold border-black/10 hover:border-transparent normal-case">
      {/* socialType: 소셜 로그인 방식 */}
      {socialType === 'Google' && <Icon.Google />}
      {socialType}로 계속하기
    </button>
  );
};

export default SocialLoginBtn;
