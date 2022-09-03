import { Popover } from '@headlessui/react';
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useLocation, useNavigate, useSearchParams } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import { Input } from './Input';

export const useMemeSearch = () => {
  const [params, setParams] = useSearchParams();

  const updateSearch = (search: string) => {
    params.set('search', search);
    setParams(params);
  };

  const clearSearch = () => {
    params.delete('search');
    setParams(params);
  };

  return { search: params.get('search'), updateSearch, clearSearch };
};

export const Search = () => {
  const { search, updateSearch, clearSearch } = useMemeSearch();
  const navigate = useNavigate();
  const location = useLocation();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      clearSearch();
    } else {
      updateSearch(e.target.value);
    }
  };

  const toMainPage = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  // Open search if search param is present
  useEffect(() => {
    if (search) {
      buttonRef.current?.click();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Popover>
      <Popover.Button ref={buttonRef} className="w-9 h-9">
        <MagnifyingGlassIcon />
      </Popover.Button>
      <Popover.Panel className="absolute left-0 right-0 bottom-full lg:left-full lg:right-auto lg:bottom-auto lg:shadow-sm lg:-translate-y-full">
        {({ close }) => {
          return (
            <div className="flex gap-1 items-center lg:w-52 p-2 bg-white lg:rounded-sm">
              <Input
                className="w-full"
                placeholder="Search"
                autoFocus
                onFocus={toMainPage}
                onChange={handleSearchChange}
                value={search ?? ''}
                type="search"
              />
              <button className="w-7 h-7" onClick={() => close()}>
                <ChevronDownIcon />
              </button>
            </div>
          );
        }}
      </Popover.Panel>
    </Popover>
  );
};
