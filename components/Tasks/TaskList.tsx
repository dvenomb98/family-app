import { XCircleIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import FullPageLoader from '../Atoms/FullPageLoader';
import ListBoxMembers from '../Atoms/ListBoxMembers';
import Message from '../Atoms/Message';
import { Status, StatusArr } from '../Types/enums';
import { Task } from '../Types/types';
import SingleTask from './SingleTask';

const TaskList = () => {
  const { userData } = UserAuth();
  const [selected, setSelected] = useState<string>(Status.Active);
  const [error, setError] = useState<string>('');

  const memberList = (userData?.members ?? []).map((member) => ({
    name: member.name,
    value: member.id,
  }));

  const memberOptions = useMemo(
    () => [{ name: 'Všichni uživatelé', value: '' }, ...memberList],
    [userData],
  );

  const [selectedMember, setSelectedMember] = useState(memberOptions[0]);

  const currentTasks = userData?.tasks?.filter((task: Task) => {
    if (selected === task.status) {
      if (!selectedMember.value) return task;
      else if (selectedMember.value === task.assigned_to) return task;
    }
  });

  return userData?.tasks ? (
    <div className="flex flex-col gap-5">
      {/* STATUS FILTER */}
      <div className="flex flex-row w-full rounded-md p-2  shadow-lg items-center justify-between gap-2  dark:bg-secondary-black bg-secondary-white">
        {StatusArr.map(({ value, label }) => (
          <button
            key={value}
            className={classNames(
              'p-3 rounded-md text-center cursor-pointer basis-1/3 font-semibold',
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
      {/* MEMBER FILTER */}
      {!!memberList.length && (
        <ListBoxMembers
          selectedValue={selectedMember}
          setSelected={setSelectedMember}
          options={memberOptions}
        />
      )}

      {/* RENDER ERROR */}
      {!!error && <Message text={error} isError={true} clearMessage={() => setError('')} />}

      {/* RENDER ALL TASKS WITH FILTER */}
      {currentTasks.map((task: Task) => (
        <SingleTask key={task?.id} task={task} setError={setError} />
      ))}

      {!currentTasks.length && !!userData.tasks.length && (
        <div className="flex items-start lg:items-center gap-5 flex-col lg:flex-row p-5 ">
          <XCircleIcon className="w-10 h-10 text-primary-red" />
          <p className="text-primary-gray">
            Nenalezen žádný úkol. Zkuste změnit parametry hledání.
          </p>
        </div>
      )}

      {/* PAGINATION */}

      {/* NO TASKS */}
      {!userData.tasks.length && (
        <div className="flex items-start lg:items-center gap-5 flex-col lg:flex-row p-5 ">
          <XCircleIcon className="w-10 h-10 text-primary-red" />
          <p className="text-primary-gray">
            Momentálně nemáte žádné úkoly k zobrazení. Založte si svůj první úkol pomocí tlačítka
            vedle profilu.
          </p>
        </div>
      )}
    </div>
  ) : (
    <FullPageLoader />
  );
};

export default TaskList;
