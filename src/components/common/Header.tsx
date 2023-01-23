import Link from 'next/link';

import Icon from './Icons';

interface HeaderPropsType {
  hideOnMobile?: boolean;
}

const Header = ({ hideOnMobile = false }: HeaderPropsType) => {
  return (
    <div
      className={`${
        hideOnMobile ? 'md:visible' : 'invisible'
      } invisible fixed bg-base-100 navbar border-b border-grey md:shadow-md md:border-none justify-center`}
    >
      <div className="max-w-3xl justify-center w-full">
        <div className="navbar-start flex">
          <Link
            href="/"
            className="hidden md:inline-flex btn btn-ghost normal-case text-2xl font-black text-main"
          >
            Marble
          </Link>
          <ul className="hidden md:flex menu menu-horizontal px-1">
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
          <Link href="/" className="btn btn-ghost normal-case text-2xl font-black text-main">
            Marble
          </Link>
        </div>
        <div className="navbar-end flex">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <Icon.Bell />
                <span className="badge badge-xs bg-main border-main indicator-item"></span>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-60"
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
          <div className="hidden md:inline-block dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <Icon.User />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box accent-main"
            >
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
