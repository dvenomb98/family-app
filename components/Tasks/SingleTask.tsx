import {
  CheckCircleIcon,
  ChevronDownIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { doc, runTransaction } from 'firebase/firestore';
import React, { useMemo, useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import FullPageLoader from '../Atoms/FullPageLoader';
import { Status } from '../Types/enums';
import { Members, Task } from '../Types/types';
import { formatDateUtil } from '../utils/FormatDate';
import { getDifficulty, getPoints, getStatus } from '../utils/getUtils';
import EditTask from './EditTask';
import OpenTaskBox from './OpenTaskBox';
import TaskOptions from './TaskOptions';

interface TaskProps {
  task: Task;
}

export enum UpdateTaskValues {
  COMPLETE_TASK = 'COMPLETE_TASK',
  DELETE_TASK = 'DELETE_TASK',
  START_PROGRESS = 'START_PROGRESS',
}

const SingleTask: React.FC<TaskProps> = ({ task }) => {
  const { userData, user } = UserAuth();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [openEditModal, setEditModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { id, title, description, difficulty, deadline_date, completed_date, assigned_to, status } =
    task;

  const currentMember = userData?.members?.find((member) => member.id === assigned_to);
  const completeAs = currentMember ? (
    <span className="flex items-center gap-2">
      <CheckCircleIcon className="w-5 h-5 text-green-500" /> Dokončit jako:{' '}
      <i className="text-primary-gray">{currentMember.name}</i>{' '}
    </span>
  ) : (
    <span className="flex items-center gap-2">
      <ExclamationTriangleIcon className="w-5 h-5 text-primary-red" />
      Pro dokončení přiraďte člena
    </span>
  );

  // IF THE ACTION DOESNT REQUIRE TO EDIT SOME OTHER VALUES AND CAN BE DONE ON 1 USER CLICK, THEN USE UPDATE TASK FUNCTION.
  // IF NOT, USE CUSTOM MODAL AND SEND TASK AS PROP

  const updateTask = async (action?: string) => {
    try {
      setLoading(true);

      await runTransaction(db, async (transaction) => {
        const ref = doc(db, 'users', user?.uid);

        const sfDoc = await transaction.get(ref);

        if (!sfDoc.exists()) {
          setLoading(false);
          return false;
        }
        const data = sfDoc.data();

        // COMPLETE TASK
        if (action === UpdateTaskValues.COMPLETE_TASK) {
          // UPDATE CURRENT TASK
          const newTaskValues = {
            ...task,
            status: Status.Completed,
            completed_date: new Date().toISOString(),
            completed_by: assigned_to,
          };
          // FIND CURRENT MEMBER FROM FIREBASE
          const currentMemberData = data.members.find(
            (member: Members) => member.id === assigned_to,
          );

          // UPDATE CURRENT MEMBER POINTS BASED ON DIFFICULTY
          const newMemberValue: Members = {
            ...currentMemberData,
            points: currentMemberData.points + getPoints(difficulty),
          };

          // UPDATE TASK AND MEMBERS
          const updatedTasks = [...data.tasks.filter((t: Task) => t.id !== id), newTaskValues];
          const updatedMember = [
            ...data.members.filter((member: Members) => member.id !== assigned_to),
            newMemberValue,
          ];

          transaction.update(ref, { tasks: updatedTasks, members: updatedMember });
        }
        // DELETE TASK
        if (action === UpdateTaskValues.DELETE_TASK) {
          const updatedTasks = [...data.tasks.filter((t: Task) => t.id !== id)];
          transaction.update(ref, { tasks: updatedTasks });
        }

        // START PROGRESS
        if (action === UpdateTaskValues.START_PROGRESS) {
          const newTaskValues = {
            ...task,
            status: Status.Progress,
          };

          const updatedTasks = [...data.tasks.filter((t: Task) => t.id !== id), newTaskValues];

          transaction.update(ref, { tasks: updatedTasks });
        }
      });

      setLoading(false);
      return true;
    } catch (error: any) {
      setLoading(false);
      return false;
    }
  };

  const options = useMemo(() => {
    if (status === Status.Active) {
      return [
        {
          title: 'Začít',
          func: () => updateTask(UpdateTaskValues.START_PROGRESS),
          isDisabled: false,
        },
        {
          title: 'Upravit',
          func: () => setEditModal(true),
          isDisabled: false,
        },

        {
          title: 'Smazat task',
          func: () => updateTask(UpdateTaskValues.DELETE_TASK),
          isDisabled: false,
        },
      ];
    } else if (status === Status.Progress) {
      return [
        {
          title: completeAs,
          func: () => updateTask(UpdateTaskValues.COMPLETE_TASK),
          isDisabled: !currentMember,
        },
        {
          title: 'Upravit',
          func: () => setEditModal(true),
          isDisabled: false,
        },

        {
          title: 'Smazat task',
          func: () => updateTask(UpdateTaskValues.DELETE_TASK),
          isDisabled: false,
        },
      ];
    }
  }, [task, userData]);

  return (
    <div className="flex flex-col bg-secondary-white dark:bg-secondary-black  rounded-md ">
      <div className={classNames(' p-5 flex flex-col gap-2')}>
        <div className="flex items-center justify-between">
          <h2 className="font-semibold lg:text-h4">{title}</h2>
          {status === Status.Completed ? (
            <CheckCircleIcon className="w-8 h-8 text-green-500" />
          ) : (
            <TaskOptions options={options} />
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-primary-gray italic">
            {currentMember ? `(${currentMember.name})` : 'Nepřirazeno'}
          </p>
          <p className="text-primary-gray italic">do {formatDateUtil(deadline_date)}</p>
        </div>
      </div>

      <div className="rounded-b-md border-primary-white  dark:border-primary-black border-t-2">
        <div
          className="cursor-pointer flex items-center gap-1 text-primary-blue py-2 px-5 "
          onClick={() => setIsOpened(!isOpened)}
        >
          <p>Detail</p>
          <ChevronDownIcon
            className={classNames(
              'w-5 h-5 transform duration-300',
              isOpened ? 'rotate-180' : 'rotate-0',
            )}
          />
        </div>

        {isOpened && (
          <div className="pt-3 pb-5 px-5">
            <div className="flex flex-col gap-5">
              <OpenTaskBox label="Popisek:" value={description} />

              <OpenTaskBox label="Obtížnost:" value={getDifficulty(difficulty)} />

              <OpenTaskBox label="Status:" value={getStatus(status)} />

              {status === Status.Completed && (
                <>
                  <OpenTaskBox label="Datum dokončení:" value={formatDateUtil(completed_date)} />
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {/* EDIT TASK  */}
      <EditTask task={task} setOpenChangeModal={setEditModal} openChangeModal={openEditModal} />
      {/* LOADER  */}
      {loading && <FullPageLoader />}
    </div>
  );
};

export default SingleTask;
