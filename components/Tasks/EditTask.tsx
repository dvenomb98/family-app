import { XMarkIcon } from '@heroicons/react/24/outline';
import { doc, runTransaction } from 'firebase/firestore';
import { Form, Formik } from 'formik';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import Button from '../Atoms/Button';
import DatePicker from '../Atoms/DatePicker';
import FormSelect from '../Atoms/FormSelect';
import FormTextArea from '../Atoms/FormTextArea';
import FormInput from '../Atoms/Input';
import Message from '../Atoms/Message';
import Modal from '../Atoms/Modal';
import { DifficultyArr } from '../Types/enums';
import { Task } from '../Types/types';

interface EditTaskProps {
  task: Task;
  setOpenChangeModal: Dispatch<SetStateAction<boolean>>;
  openChangeModal: boolean;
}

const EditTask: React.FC<EditTaskProps> = ({ task, openChangeModal, setOpenChangeModal }) => {
  const { userData, user } = UserAuth();
  const [message, setMessage] = useState('false');
  const [error, setError] = useState<boolean>(false);

  const resetValidation = () => {
    setError(false);
    setMessage('');
  };

  const { title, description, id, assigned_to, deadline_date, difficulty } = task;

  const editTask = async (values: any) => {
    try {
      resetValidation();
      await runTransaction(db, async (transaction) => {
        const ref = doc(db, 'users', user?.uid);

        const sfDoc = await transaction.get(ref);

        if (!sfDoc.exists()) {
          setMessage('Nastala chyba. Zkuste to prosím znovu.');
          setError(true);
          return false;
        }

        const data = sfDoc.data();

        const newTaskValues = {
          ...task,
          assigned_to: values.assigned_to,
          difficulty: values.difficulty,
          title: values.title,
          description: values.description,
          deadline_date: values.deadline_date,
        };

        const updatedTasks = [...data.tasks.filter((t: Task) => t.id !== id), newTaskValues];

        transaction.update(ref, { tasks: updatedTasks });
      });
      return true;
    } catch (error: any) {
      setMessage('Nastala chyba. Zkuste to prosím znovu.');
      setError(true);
      return false;
    }
  };

  const initialValues = {
    title: title,
    description: description,
    deadline_date: deadline_date,
    difficulty: difficulty,
    assigned_to: assigned_to,
  };

  const memberOptions = userData?.members?.map((member) => ({
    value: member.id,
    label: member.name,
  }));

  return (
    <Modal
      onModalEnter={() => resetValidation()}
      key={task.id}
      open={openChangeModal}
      title="Upravit úkol"
      onClose={() => setOpenChangeModal(false)}
    >
      <>
        <Formik
          initialValues={initialValues}
          // validationSchema={}
          onSubmit={async (values) => {
            const response = await editTask(values);
            response && setMessage('Změna proběhla úspěšně!');
          }}
          key={task.id}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-5 relative">
              <FormInput name="title" label="Název" placeholder="Daniel" />
              <FormTextArea name="description" label="Popisek" cols={5} rows={5} />
              <FormSelect
                firstEmpty
                name="assigned_to"
                label="Přiradit člena"
                emptyLabel={'Nepřirazeno'}
                options={memberOptions}
              />
              <FormSelect name="difficulty" label="Obtížnost" options={DifficultyArr} />
              <DatePicker name="deadline_date" label="Deadline" />
              {!!message && <Message isError={error} text={message} />}
              <Button isSubmit loading={isSubmitting}>
                <>Upravit úkol</>
              </Button>
            </Form>
          )}
        </Formik>
        <XMarkIcon
          className="absolute w-5 h-5 top-6 right-5 cursor-pointer"
          onClick={() => setOpenChangeModal(false)}
        />
      </>
    </Modal>
  );
};

export default EditTask;
