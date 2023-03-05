import { useRouter } from 'next/router';

import { useTypeSelector } from '@/store';

interface LayoutProps {
  children: React.ReactNode;
}

const RouteGuard = ({ children }: LayoutProps) => {
  const router = useRouter();
  const id = useTypeSelector((state) => state.user.id);

  if (!id) {
    router?.push({
      pathname: '/login',
    });
  }

  return (
    <>
      <div>{id && children}</div>
    </>
  );
};

export default RouteGuard;
