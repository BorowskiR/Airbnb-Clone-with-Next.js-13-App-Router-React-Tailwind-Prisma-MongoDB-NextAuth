import { useCallback, useRef, useState } from 'react';
import { signOut } from 'next-auth/react';
import { MenuItem } from './MenuItem';
import { Avatar } from '../Avatar';
import { AiOutlineMenu } from 'react-icons/ai';

import { useLoginModal } from '@/hooks/useLoginModal';
import { useRegisterModal } from '@/hooks/useRegisterModal';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useRentModal } from '@/hooks/useRentModal';

import { SafeUser } from '@/types';
import { useRouter } from 'next/navigation';
interface UserMenuProps {
  currentUser?: SafeUser | null;
}

export const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();
  const loginModal = useLoginModal();

  const ref = useRef<HTMLDivElement>(null);
  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  useOutsideClick(ref, toggleMenu);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, currentUser, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>

        <div
          onClick={toggleMenu}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
      "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          ref={ref}
          className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden top-12 right-0 text-sm"
        >
          <div className="flex flex-col cursor-pointer">
            <>
              {currentUser ? (
                <>
                  <MenuItem
                    onClick={() => {
                      router.push('/trips');
                    }}
                    label="My trips"
                  />
                  <MenuItem
                    onClick={() => router.push('/favorites')}
                    label="My favorites"
                  />
                  <MenuItem
                    onClick={() => router.push('/reservations')}
                    label="My reservations"
                  />
                  <MenuItem
                    onClick={() => router.push('/properties')}
                    label="My properties"
                  />
                  <MenuItem onClick={rentModal.onOpen} label="Airbnb my home" />
                  <hr />
                  <MenuItem onClick={() => signOut()} label="Logout" />
                </>
              ) : (
                <>
                  <MenuItem onClick={loginModal.onOpen} label="Login" />
                  <MenuItem onClick={registerModal.onOpen} label="Sign up" />
                </>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
};
