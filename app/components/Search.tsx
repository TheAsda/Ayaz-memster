import { Popover } from '@headlessui/react';
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useNavigate, useSearchParams } from '@remix-run/react';
import { Input } from './Input';

export const Search = () => {
  const [search, setSearch] = useSearchParams();
  const navigate = useNavigate();

  const updateSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    
    search.set('search', e.target.value);
    setSearch(search);
  };

  return (
    <Popover>
      <Popover.Button className="w-9 h-9">
        <MagnifyingGlassIcon />
      </Popover.Button>
      <Popover.Panel className="absolute left-0 right-0 top-0 -translate-y-full bg-white p-2">
        {({ close }) => (
          <div className="flex gap-1 items-center">
            <Input
              className="w-full "
              placeholder="Search"
              autoFocus
              onFocus={() => navigate('/')}
              onChange={updateSearch}
              type="search"
            />
            <button className="w-7 h-7" onClick={() => close()}>
              <ChevronDownIcon />
            </button>
          </div>
        )}
      </Popover.Panel>
    </Popover>
  );
};
