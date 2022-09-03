import { Popover } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import type { User } from '~/types/user';

export interface ProfileButtonProps {
  user: User;
}

export const ProfileButton = (props: ProfileButtonProps) => {
  return (
    <Popover className="relative">
      <Popover.Button className="w-9 h-9">
        <UserCircleIcon />
      </Popover.Button>
      <Popover.Panel className="absolute top-0 -translate-y-full right-0 bg-white p-2">
        <div className="flex flex-col gap-1 text-xl">
          <p className=" p-2">{props.user.username}</p>
          <form action="/logout" method="post">
            <button className="text-red-500 p-2 border border-red-500 rounded-sm hover:bg-red-50">
              Logout
            </button>
          </form>
        </div>
      </Popover.Panel>
    </Popover>
  );
};
