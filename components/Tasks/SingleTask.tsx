import {
  CheckCircleIcon,
  ChevronDownIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { doc, runTransaction } from 'firebase/firestore';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import FullPageLoader from '../Atoms/FullPageLoader';
import { Status } from '../Types/enums';
import { Members, Task } from '../Types/types';
import { formatDateUtil, isExpired } from '../utils/FormatDate';
import { getDifficulty, getPoints, getStatus } from '../utils/getUtils';
import EditTask from './EditTask';
import OpenTaskBox from './OpenTaskBox';
import TaskOptions from './TaskOptions';
import default_picture from '../Images/default_picture.png';

interface TaskProps {
  task: Task;
  setError: Dispatch<SetStateAction<string>>;
}

export enum UpdateTaskValues {
  COMPLETE_TASK = 'COMPLETE_TASK',
  DELETE_TASK = 'DELETE_TASK',
  START_PROGRESS = 'START_PROGRESS',
  STOP_PROGRESS = 'STOP_PROGRESS',
}

const SingleTask: React.FC<TaskProps> = ({ task, setError }) => {
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

  const isAfteDeadline = isExpired(deadline_date) && status !== Status.Completed;

  // IF THE ACTION DOESNT REQUIRE TO EDIT SOME OTHER VALUES AND CAN BE DONE ON 1 USER CLICK, THEN USE UPDATE TASK FUNCTION.
  // IF NOT, USE CUSTOM MODAL AND SEND TASK AS PROP

  const updateTask = async (action?: string) => {
    try {
      setLoading(true);
      setError('');

      await runTransaction(db, async (transaction) => {
        const ref = doc(db, 'users', user?.uid);

        const sfDoc = await transaction.get(ref);

        if (!sfDoc.exists()) {
          setLoading(false);
          setError('Omlouváme se, nastala chyba. Zkuste to znovu.');
          return false;
        }
        const data = sfDoc.data();

        // COMPLETE TASK
        if (action === UpdateTaskValues.COMPLETE_TASK) {
          // update current task
          const newTaskValues = {
            ...task,
            status: Status.Completed,
            completed_date: new Date().toISOString(),
            completed_by: assigned_to,
          };
          // find current member from firebase
          const currentMemberData = data.members.find(
            (member: Members) => member.id === assigned_to,
          );

          // update current member and points
          const newMemberValue: Members = {
            ...currentMemberData,
            points: currentMemberData.points + getPoints(difficulty),
            completed_tasks: currentMemberData.completed_tasks + 1,
          };

          // update tasks and members
          const updatedTasks = [newTaskValues, ...data.tasks.filter((t: Task) => t.id !== id)];
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

          const updatedTasks = [newTaskValues, ...data.tasks.filter((t: Task) => t.id !== id)];

          transaction.update(ref, { tasks: updatedTasks });
        }

        //STOP PROGRESS
        if (action === UpdateTaskValues.STOP_PROGRESS) {
          const newTaskValues = {
            ...task,
            status: Status.Active,
          };

          const updatedTasks = [newTaskValues, ...data.tasks.filter((t: Task) => t.id !== id)];

          transaction.update(ref, { tasks: updatedTasks });
        }
      });

      setLoading(false);
      return true;
    } catch (error: any) {
      setError('Omlouváme se, nastala chyba. Zkuste to znovu.');
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
          title: 'Pozastavit',
          func: () => updateTask(UpdateTaskValues.STOP_PROGRESS),
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
    }
  }, [task, userData]);

  return (
    <div className="flex flex-col bg-secondary-white dark:bg-secondary-black rounded-md ">
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
          <div className=" flex items-center gap-2">
            <div className="overflow-hidden h-[20px] w-[20px] relative lg:h-[30px] lg:w-[30px]">
              <Image
                src={currentMember?.img || default_picture}
                fill
                sizes="max-w-10 max-h-10"
                alt="User account image"
                className="rounded-full w-full h-full object-cover border border-primary-gray"
              />
            </div>
            <p className="text-primary-gray italic">
              {currentMember ? `(${currentMember.name})` : '(Nepřirazeno)'}
            </p>
          </div>
          <p
            className={classNames(
              'italic',
              isAfteDeadline ? 'text-primary-red' : 'text-primary-gray',
            )}
          >
            do {formatDateUtil(deadline_date)}
          </p>
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
