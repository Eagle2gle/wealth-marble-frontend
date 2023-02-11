import { useRouter } from 'next/router';

import Icon from './Icons';

interface TabInfoType {
  readonly icon: JSX.Element;
  readonly label: string;
  readonly route: string;
}

const TAB_INFOS: readonly TabInfoType[] = [
  {
    icon: <Icon.Home />,
    label: '홈',
    route: '/',
  },
  {
    icon: <Icon.Gavel />,
    label: '공모',
    route: '/cahoots',
  },
  {
    icon: <Icon.Market />,
    label: '마켓',
    route: '/markets',
  },
  {
    icon: <Icon.User />,
    label: '마이페이지',
    route: '/mypage',
  },
];

const BottomBar = () => {
  const router = useRouter();

  return (
    <div className="btm-nav fixed z-10 border-t border-grey md:hidden">
      {TAB_INFOS.map(({ icon, label, route }) => (
        <button key={route} onClick={() => router.push(route)}>
          <div className={router.route === route ? 'text-main' : ''}>{icon}</div>
          <span className="btm-nav-label">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomBar;
