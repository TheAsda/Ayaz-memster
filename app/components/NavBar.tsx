import {
  ArrowRightOnRectangleIcon,
  HomeIcon,
  PlusIcon,
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
    <header className="order-1 sticky bottom-0 lg:-order-none">
      <div className="flex gap-2 items-center justify-evenly bg-white p-1 lg:flex-col lg:items-start lg:justify-start">
        <Link to="/" className="w-9 h-9">
          <HomeIcon />
        </Link>
        <Link to="/meme/new" className="w-9 h-9">
          <PlusIcon />
        </Link>
        <Search />
        {user ? (
          <ProfileButton user={user} />
        ) : (
          <Link to="/login" className="w-9 h-9 text-green-600">
            <ArrowRightOnRectangleIcon />
          </Link>
        )}
      </div>
    </header>
  );
};
