import cls from '@/utils/classnames';

import BottomBar from './BottomBar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
  hideBottomBar?: boolean;
}

const Layout = ({ children, hideBottomBar, hideHeader }: LayoutProps) => {
  console.log(!hideHeader && !hideBottomBar, !hideBottomBar, !hideHeader);
  return (
    <>
      {!hideHeader && <Header />}
      <div
        className={cls(
          !hideHeader && !hideBottomBar ? 'py-16' : 'py-0',
          !hideBottomBar ? 'pb-16 md:pb-0' : 'pb-0',
          !hideHeader ? 'pt-16' : 'pt-0',
          'max-w-3xl mx-auto'
        )}
      >
        {children}
      </div>
      {!hideBottomBar && <BottomBar />}
    </>
  );
};

export default Layout;
