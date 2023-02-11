import classNames from '@/utils/classnames';

import BottomBar from './BottomBar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  hideHeader?: boolean;
  hideBottomBar?: boolean;
  hideHeaderOnMobile?: boolean;
}

const Layout = ({ children, hideBottomBar, hideHeader, hideHeaderOnMobile }: LayoutProps) => {
  return (
    <>
      {!hideHeader && <Header hideOnMobile={hideHeaderOnMobile} />}
      <div
        className={classNames(
          !hideHeader && !hideBottomBar ? 'py-16' : 'py-0',
          !hideBottomBar ? 'pb-16 md:pb-0' : 'pb-0',
          !hideHeader ? 'pt-16' : 'pt-0',
          !hideHeaderOnMobile ? 'pt-16' : 'md:pt-16 pt-0',
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
