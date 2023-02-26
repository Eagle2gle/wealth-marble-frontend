import Icon from '@/components/common/Icons';

type SocialType = 'Google';

interface PropsType {
  readonly socialType: SocialType;
  onClick: () => void;
}

const SocialLoginBtn = ({ socialType, onClick }: PropsType) => {
  return (
    <button
      className="btn w-96 gap-8 border-black/10 bg-transparent font-bold normal-case text-black hover:border-transparent hover:bg-main hover:text-white"
      onClick={onClick}
    >
      {/* socialType: 소셜 로그인 방식 */}
      {socialType === 'Google' && <Icon.Google />}
      {socialType}로 계속하기
    </button>
  );
};

export default SocialLoginBtn;
