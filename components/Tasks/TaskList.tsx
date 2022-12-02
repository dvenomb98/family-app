import React from 'react';
import { UserAuth } from '../../context/AuthContext';
import SingleTask from './SingleTask';

const TaskList = () => {
  const { userData } = UserAuth();

  return (
    <div className="flex flex-col gap-5">
      {userData?.tasks?.map((task) => (
        <SingleTask key={task?.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
