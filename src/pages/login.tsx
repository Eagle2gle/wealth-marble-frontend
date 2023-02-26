import SocialLoginBtn from '@/components/SocialLoginBtn';
import { useGoogleLogin } from '@react-oauth/google';

export default function Login() {
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      // TODO: 액세스 토큰 저장
      // TODO: 라우팅
    },
    onError: (error) => console.log(error),
  });

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-14 rounded-xl border-black/20 px-12 py-12 md:border ">
        <h1 className="text-center text-4xl font-bold">
          간편한 소셜 로그인으로 <br />
          <span className="text-main">Marble</span>과 함께 해요
        </h1>
        <SocialLoginBtn socialType="Google" onClick={googleLogin} />
      </div>
    </div>
  );
}
