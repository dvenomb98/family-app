import classNames from 'classnames';
import React, { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { Status, StatusArr } from '../Types/enums';
import SingleTask from './SingleTask';

const TaskList = () => {
  const { userData } = UserAuth();
  const [selected, setSelected] = useState<string>(Status.Active);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row w-full lg:w-2/3 items-center justify-between gap-2 mb-5">
        {StatusArr.map(({ value, label }) => (
          <p
            key={value}
            className={classNames(
              'p-3 dark:bg-secondary-black rounded-md text-center cursor-pointer w-full',
              selected === value && 'text-primary-blue',
            )}
            onClick={() => setSelected(value)}
          >
            {label}
          </p>
        ))}
      </div>

      {userData?.tasks?.reverse().map((task) => {
        if (selected === task.status) {
          return <SingleTask key={task?.id} task={task} />;
        }
      })}
    </div>
  );
};

export default TaskList;
