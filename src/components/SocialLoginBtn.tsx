import Link from 'next/link';

import Icon from '@/components/common/Icons';

type SocialType = 'Google';

interface PropsType {
  readonly socialType: SocialType;
}

const SocialLoginBtn = ({ socialType }: PropsType) => {
  return (
    <Link
      href={`http://wealth-server.kro.kr/oauth2/authorization/${socialType.toLowerCase()}`}
      className="btn w-96 gap-8 border-black/10 bg-transparent font-bold normal-case text-black hover:border-transparent hover:bg-main hover:text-white"
    >
      {/* socialType: 소셜 로그인 방식 */}
      {socialType === 'Google' && <Icon.Google />}
      {socialType}로 계속하기
    </Link>
  );
};

export default SocialLoginBtn;
