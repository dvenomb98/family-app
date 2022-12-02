import { Popover, Transition } from '@headlessui/react';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface OptionProps {
  title: string | JSX.Element;
  func: () => void;
  isDisabled: boolean;
}
interface TaskOptionsProps {
  options: OptionProps[];
}

const TaskOptions: React.FC<TaskOptionsProps> = ({ options }) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <div className="flex flex-col items-center">
          <Popover.Button className="outline-none p-1">
            <Bars3CenterLeftIcon className="w-5 h-5" />
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
            <Popover.Panel className="absolute z-50 right-0  bg-secondary-white dark:bg-secondary-black flex flex-col items-start gap-2 p-2 rounded-md w-72 lg:w-96">
              <ul className="w-full">
                {options?.map((option, index) => (
                  <li
                    className="p-2 cursor-pointer w-full hover:bg-primary-white dark:hover:bg-primary-black/30 rounded-md transition-all ease-in-out"
                    key={index}
                    onClick={() => {
                      if (option.isDisabled || !option.func) return;
                      option.func();
                    }}
                  >
                    {option.title}
                  </li>
                ))}
              </ul>
            </Popover.Panel>
          </Transition>
        </div>
      )}
    </Popover>
  );
};

export default TaskOptions;
