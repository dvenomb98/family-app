import React, { Dispatch, SetStateAction, useState } from 'react';
import ListBoxDate from '../Atoms/ListBoxDate';
import Modal from '../Atoms/Modal';
import { FilterByTime, TimeArr } from '../Types/enums';
import { Task } from '../Types/types';
import { formatDateUtil } from '../utils/FormatDate';
import { getDifficulty } from '../utils/getUtils';

interface CompletedTasksModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  tasks: Task[];
  memberName: string;
}

const CompletedTasksModal: React.FC<CompletedTasksModalProps> = ({
  open,
  setOpen,
  tasks,
  memberName,
}) => {
  const [selectedTime, setSelectedTime] = useState<string>(FilterByTime.Newest);

  return (
    <Modal
      onClose={() => setOpen(false)}
      cancelButton
      open={open}
      title={'Seznam splněných úkolů'}
      description={`Uživatel: ${memberName}`}
    >
      {tasks.length ? (
        <>
          <ListBoxDate
            selectedValue={selectedTime}
            setSelected={setSelectedTime}
            options={TimeArr}
          />

          <div className="flex flex-col gap-10 mt-2">
            {tasks
              .sort((a: Task, b: Task) => {
                if (selectedTime === FilterByTime.Newest) {
                  return new Date(a.deadline_date).getTime() - new Date(b.deadline_date).getTime();
                } else
                  return new Date(b.deadline_date).getTime() - new Date(a.deadline_date).getTime();
              })
              .map((task: Task) => (
                <div
                  className=" border-b border-primary-gray pb-2 flex flex-col gap-2"
                  key={task.id}
                >
                  <p className="font-semibold text-h4">{task.title}</p>
                  <div className="flex flex-col lg:flex-row lg:justify-between">
                    <p className="text-primary-gray">
                      Dokončeno: <i>{formatDateUtil(task.completed_date)}</i>
                    </p>
                    <p className="text-primary-gray">
                      Obtížnost: <i>{getDifficulty(task.difficulty)}</i>
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </>
      ) : (
        <p className="text-primary-gray py-5"> {memberName} zatím nedokončil/a žádný úkol.</p>
      )}
    </Modal>
  );
};

export default CompletedTasksModal;
