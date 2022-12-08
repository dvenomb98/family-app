import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import React, { Dispatch, FC, SetStateAction } from 'react';
import { FilterByTime } from '../Types/enums';

interface ListBoxDateProps {
  setSelected: Dispatch<SetStateAction<string>>;
  selectedValue: string;
  options: { label: string; value: FilterByTime }[];
}

const ListBoxDate: FC<ListBoxDateProps> = ({ setSelected, selectedValue, options }) => {
  return (
    <Listbox value={selectedValue} onChange={setSelected}>
      <div className="relative">
        <Listbox.Button className="bg-input-color dark:bg-input-color-dark p-2 rounded-md w-full text-left">
          {options.map(
            (option) =>
              selectedValue === option.value && (
                <span key={option.value} className="ml-2">
                  {option.label}
                </span>
              ),
          )}
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
          <div className="fixed inset-0 bg-primary-black/50 z-40" />

          <Listbox.Options className="absolute flex flex-col w-3/4 md:w-1/2 lg:w-96  shadow-lg z-50 p-2 mt-1 rounded-md  dark:bg-secondary-black bg-secondary-white">
            {options?.map((option: any) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className="w-full p-2 cursor-pointer rounded-md hover:bg-input-color dark:hover:bg-input-color-dark/50 transition ease-linear"
              >
                {({ selected }) => (
                  <div className="flex gap-1 items-center">
                    {selected && <CheckIcon className="text-primary-blue h-5 w-5" />}
                    <span className={classNames(selected && 'text-primary-blue')}>
                      {option.label}
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

export default ListBoxDate;
