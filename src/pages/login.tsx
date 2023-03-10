import SocialLoginBtn from '@/components/SocialLoginBtn';

export default function Login() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="px-12 py-12 md:border border-black/20 flex flex-col gap-14 items-center rounded-xl ">
        <h1 className="text-center text-4xl font-bold">
          간편한 소셜 로그인으로 <br />
          <span className="text-main">Marble</span>과 함께 해요
        </h1>
        <SocialLoginBtn socialType="Google" />
      </div>
    </div>
  );
}
