import { Popover, Transition } from '@headlessui/react';
import Image from 'next/image';
import React from 'react';
import default_image from '../Images/default_image.webp';
import classNames from 'classnames';
import Button from '../Atoms/Button';
import { useModalContext } from '../../context/ModalContext';

const AccountPopper = () => {
  const { showNewUserModal } = useModalContext();

  const links = [
    { title: 'Můj účet', url: '' },
    { title: 'Odhlásit se', url: '' },
  ];

  return (
    <>
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button>
              <Image
                src={default_image}
                width={60}
                height={60}
                alt="User account image"
                className={classNames(
                  'rounded-full transform duration-500',
                  open ? 'rotate-12 ' : 'rotate-0',
                )}
              />
            </Popover.Button>

            <Transition
              show={open}
              enter="transition-opacity duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Overlay className="fixed inset-0 bg-primary-black opacity-50" />
              <Popover.Panel className="absolute z-50 right-0  bg-secondary-white dark:bg-secondary-black flex flex-col items-start gap-2 p-5 rounded-md lg:w-96">
                <Button
                  text="Přidat uživatele"
                  onClick={() => {
                    close();
                    showNewUserModal();
                  }}
                />

                <ul className="w-full">
                  {links?.map((link, index) => (
                    <li
                      className="p-2  cursor-pointer w-full hover:bg-primary-white dark:hover:bg-primary-black/30 rounded-md transition-all ease-in-out"
                      key={index}
                    >
                      {link.title}
                    </li>
                  ))}
                </ul>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  );
};

export default AccountPopper;
