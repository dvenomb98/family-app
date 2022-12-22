import { Popover, Transition } from '@headlessui/react';
import Image from 'next/image';
import React from 'react';
import default_picture from '../Images/default_picture.png';
import classNames from 'classnames';
import Button from '../Atoms/Button';
import { useModalContext } from '../../context/ModalContext';
import { useRouter } from 'next/router';
import { UserAuth } from '../../context/AuthContext';

const AccountPopper = () => {
  const { showNewUserModal } = useModalContext();
  const router = useRouter();
  const { logout, loggedMember } = UserAuth();

  const links = [
    { title: 'Nástěnka', url: '/dashboard', func: undefined },
    { title: 'Můj účet', url: '/account', func: undefined },
    { title: 'Změnit uživatele', url: '/member', func: undefined },
    { title: 'Odhlásit se', url: '', func: logout },
  ];

  return (
    <>
      <Popover className="relative z-[500]">
        {({ open, close }) => (
          <div className="flex flex-col items-center">
            <Popover.Button className="outline-none ">
              <div className="overflow-hidden h-[60px] w-[60px] relative">
                <Image
                  src={loggedMember?.img || default_picture}
                  fill
                  sizes="max-w-60 max-h-60"
                  alt="User account image"
                  className={classNames(
                    'rounded-full w-full h-full object-cover transform duration-500 border-primary-blue border-2',
                    open ? 'rotate-12 ' : 'rotate-0',
                  )}
                />
              </div>
            </Popover.Button>

            <Transition
              show={open}
              enter="transition-opacity ease-out duration-300"
              enterFrom=" opacity-0 "
              enterTo="opacity-100"
              leave="transition-opacity ease-in  duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Overlay className="fixed inset-0 bg-primary-black opacity-50" />
              <Popover.Panel className="absolute z-50 right-0  bg-secondary-white dark:bg-secondary-black flex flex-col items-start gap-2 p-5 rounded-md w-72 lg:w-96">
                <Button
                  onClick={() => {
                    close();
                    showNewUserModal();
                  }}
                >
                  <>Přidat uživatele</>
                </Button>

                <ul className="w-full">
                  {links?.map((link, index) => (
                    <li
                      className="p-2  cursor-pointer w-full hover:bg-primary-white dark:hover:bg-primary-black/30 rounded-md transition-all ease-in-out"
                      key={index}
                      onClick={() => {
                        if (link.url) {
                          router.push(link.url);
                        } else if (link.func) {
                          link.func();
                        }
                      }}
                    >
                      {link.title}
                    </li>
                  ))}
                </ul>
              </Popover.Panel>
            </Transition>
          </div>
        )}
      </Popover>
    </>
  );
};

export default AccountPopper;
