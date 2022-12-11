import { Listbox, Transition } from '@headlessui/react';

import React from 'react';

import classNames from 'classnames';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

interface ListBoxProps {
  selectedValue: any;
  setSelected: any;
  options: any;
}

const ListBoxMembers: React.FC<ListBoxProps> = ({ selectedValue, setSelected, options }) => {
  return (
    <Listbox value={selectedValue} onChange={setSelected}>
      <div className="relative">
        <Listbox.Button className="bg-secondary-white relative  dark:bg-secondary-black p-2 rounded-md w-48 text-left">
          <span className="ml-2">{selectedValue.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center mr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          enter="transition-opacity ease-out duration-300"
          enterFrom=" opacity-0 "
          enterTo="opacity-100"
          leave="transition-opacity ease-in  duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-primary-black/50 z-50" />

          <Listbox.Options className="absolute flex flex-col w-3/4 md:w-1/2 lg:w-96  shadow-lg z-50 p-2 rounded-md mt-1 dark:bg-secondary-black bg-secondary-white">
            {options?.map((member: any, index: number) => (
              <Listbox.Option
                key={member.value}
                value={member}
                className="w-full p-2 cursor-pointer rounded-md hover:bg-input-color dark:hover:bg-input-color-dark/50 transition ease-linear"
              >
                {({ selected }) => (
                  <div className="flex gap-1 items-center">
                    {selected && <CheckIcon className="text-primary-blue h-5 w-5" />}
                    <span className={classNames(selected && 'text-primary-blue')}>
                      {member.name}
                    </span>
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default ListBoxMembers;
