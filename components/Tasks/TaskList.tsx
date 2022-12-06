import { Listbox } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import ListBox from '../Atoms/ListBox';
import Example from '../Atoms/ListBox';
import { Status, StatusArr } from '../Types/enums';
import { Members } from '../Types/types';
import SingleTask from './SingleTask';

const TaskList = () => {
  const { userData } = UserAuth();
  const [selected, setSelected] = useState<string>(Status.Active);

  const memberList = (userData?.members ?? []).map((member) => ({
    name: member.name,
    value: member.id,
  }));

  const memberOptions = useMemo(() => [{ name: 'Vše', value: '' }, ...memberList], [userData]);

  const [selectedMember, setSelectedMember] = useState(memberOptions[0]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row w-full lg:w-2/3 rounded-md p-2  shadow-lg items-center justify-between gap-2  dark:bg-secondary-black bg-secondary-white">
        {StatusArr.map(({ value, label }) => (
          <button
            key={value}
            className={classNames(
              'p-3 rounded-md text-center cursor-pointer w-full  font-semibold',
              selected === value
                ? 'text-primary-blue outline outline-primary-blue '
                : 'hover:bg-input-color dark:hover:bg-input-color-dark/50 transition ease-linear ',
            )}
            onClick={() => setSelected(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <div>
        {!!memberList.length && (
          <ListBox
            selectedValue={selectedMember}
            setSelected={setSelectedMember}
            options={memberOptions}
          />
        )}
      </div>
      {/* RENDER ALL TASKS WITH FILTER */}
      {userData?.tasks?.reverse().map((task) => {
        if (!!selectedMember.value && selectedMember.value !== task.assigned_to) return null;

        if (selected === task.status) {
          return <SingleTask key={task?.id} task={task} />;
        }
      })}
      {/* NO TASKS */}
      {!userData?.tasks.length && (
        <div className="flex items-start gap-5 flex-col lg:flex-row">
          <XCircleIcon className="w-10 h-10 text-primary-red" />
          <p className="text-primary-gray">
            Momentálně nemáte žádné úkoly k zobrazení. Založte si svůj první úkol pomocí tlačítka
            vedle profilu.
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
