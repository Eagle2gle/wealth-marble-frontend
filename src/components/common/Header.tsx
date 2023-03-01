import Link from 'next/link';

import { useTypeDispatch, useTypeSelector } from '@/store';
import { logout } from '@/store/modules/user';

import Icon from './Icons';

interface HeaderPropsType {
  hideOnMobile?: boolean;
}

const Header = ({ hideOnMobile = false }: HeaderPropsType) => {
  const dispatch = useTypeDispatch();
  const { id } = useTypeSelector((state) => state.user);

  const onLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <div
      className={`${
        hideOnMobile ? 'invisible md:visible' : ''
      } navbar fixed z-50 justify-center border-b border-grey bg-base-100 md:border-none md:shadow-md`}
    >
      <div className="w-full max-w-3xl justify-center">
        <div className="navbar-start flex">
          <Link
            href="/"
            className="btn-ghost btn hidden text-2xl font-black normal-case text-main md:inline-flex"
          >
            Marble
          </Link>
          <ul className="menu menu-horizontal hidden px-1 md:flex">
            <li>
              <Link href="/cahoots" className="font-black">
                공모
              </Link>
            </li>
            <li>
              <Link href="/markets" className="font-black">
                마켓
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-center flex md:hidden">
          <Link href="/" className="btn-ghost btn text-2xl font-black normal-case text-main">
            Marble
          </Link>
        </div>
        <div className="navbar-end flex">
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-ghost btn-circle btn">
              <div className="indicator">
                <Icon.Bell />
                <span className="badge badge-xs indicator-item border-main bg-main"></span>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 w-60 bg-base-100 p-2 shadow"
            >
              <li>
                <a>알림 내역입니다.</a>
              </li>
              <li>
                <a>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus orci eu
                  molestie egestas. Duis vel lorem suscipit, malesuada metus vitae, rhoncus ex.
                </a>
              </li>
              <li>
                <a>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus orci eu
                  molestie egestas. Duis vel lorem suscipit, malesuada metus vitae, rhoncus ex.
                </a>
              </li>
            </ul>
          </div>
          <div className="dropdown-end dropdown hidden md:inline-block">
            <label tabIndex={0} className="btn-ghost btn-circle btn">
              <Icon.User />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-compact mt-3 bg-base-100 p-2 accent-main shadow"
            >
              {id ? (
                <>
                  <li>
                    <Link href="/mypage" className="break-keep">
                      마이페이지
                    </Link>
                  </li>
                  <li>
                    <button onClick={onLogoutClick}>로그아웃</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login" className="break-keep">
                      로그인
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
