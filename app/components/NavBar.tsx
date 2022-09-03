import {
  ArrowRightOnRectangleIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import { Link } from '@remix-run/react';
import type { User } from '~/types/user';
import { ProfileButton } from './ProfileButtont';
import { Search } from './Search';

export interface HeaderProps {
  user?: User;
}

export const NavBar = (props: HeaderProps) => {
  const { user } = props;

  return (
    <header className="order-2 sticky bottom-0 flex justify-evenly items-center p-1 bg-white lg:-order-none lg:items-start lg:justify-start gap-2 lg:flex-col">
      <Link to="/" className="w-9 h-9">
        <HomeIcon />
      </Link>
      <Search />
      {user ? (
        <ProfileButton user={user} />
      ) : (
        <Link to="/login" className="w-9 h-9 text-green-600">
          <ArrowRightOnRectangleIcon />
        </Link>
      )}
    </header>
  );
};
