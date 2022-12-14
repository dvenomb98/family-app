import { doc, runTransaction } from 'firebase/firestore';
import { Form, Formik } from 'formik';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import { useModalContext } from '../../context/ModalContext';
import { db } from '../../firebase';
import Button from '../Atoms/Button';
import DatePicker from '../Atoms/DatePicker';
import FormSelect from '../Atoms/FormSelect';
import FormTextArea from '../Atoms/FormTextArea';
import FormInput from '../Atoms/Input';
import Message from '../Atoms/Message';
import Modal from '../Atoms/Modal';
import { Difficulty, DifficultyArr, Status } from '../Types/enums';
import { Task } from '../Types/types';
import * as Yup from 'yup';

const CreateTask = () => {
  const { openCreateTaskModal } = useModalContext();
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const { userData, user } = UserAuth();

  const NewTaskSchema = Yup.object().shape({
    title: Yup.string().min(2, 'Moc krátké!').max(20, 'Moc dlouhé!').required('Vyžadováno'),
    description: Yup.string().min(2, 'Moc krátké!').required('Vyžadováno'),
    deadline_date: Yup.string().required('Vyžadováno'),
  });

  if (!userData.members) return null;

  const initialValues: Task = {
    id: '',
    title: '',
    description: '',
    deadline_date: '',
    difficulty: Difficulty.Medium,
    completed_date: '',
    assigned_to: '',
    status: Status.Active,
  };

  const memberOptions = userData?.members?.map((member) => ({
    value: member.id,
    label: member.name,
  }));

  const createNewTask = async (values: Task) => {
    try {
      setError(false);
      setMessage('');
      await runTransaction(db, async (transaction) => {
        const ref = doc(db, 'users', user?.uid);

        const sfDoc = await transaction.get(ref);

        if (!sfDoc.exists()) {
          return false;
        }

        const generateId = {
          ...values,
          id: nanoid(),
        };

        const newTask = [generateId, ...sfDoc.data().tasks];
        transaction.update(ref, { tasks: newTask });
      });
      return true;
    } catch (error: any) {
      setMessage(error.message);
      setError(true);
      return false;
    }
  };

  return (
    <Modal
      onModalEnter={() => {
        setMessage('');
        setError(false);
      }}
      key="createTaskModal"
      cancelButton
      open={openCreateTaskModal}
      title="Vytvořit úkol"
      description="Musíme doma něco nového udělat? Založte si úkol."
    >
      <Formik
        initialValues={initialValues}
        validationSchema={NewTaskSchema}
        onSubmit={async (values, { resetForm }) => {
          const response = await createNewTask(values);

          if (response) {
            setMessage('Úkol byl úspěšně vytvořen!');
            resetForm();
          }
        }}
        key="createTaskFormik"
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-5">
            <FormInput name="title" label="Název" placeholder="Daniel" />
            <FormTextArea
              name="description"
              label="Popisek "
              cols={5}
              rows={5}
              placeholder="Uklidit nádobí..."
            />
            <FormSelect
              firstEmpty
              emptyLabel={'Nepřirazeno'}
              name="assigned_to"
              label="Přirazený člen"
              options={memberOptions}
            />
            <FormSelect name="difficulty" label="Obtížnost" options={DifficultyArr} />
            <DatePicker name="deadline_date" label="Deadline" />
            {!!message && <Message isError={error} text={message} />}
            <Button isSubmit loading={isSubmitting}>
              <>Vytvořit úkol</>
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CreateTask;
