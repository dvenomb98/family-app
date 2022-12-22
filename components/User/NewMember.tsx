import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useModalContext } from '../../context/ModalContext';
import Button from '../Atoms/Button';
import FormInput from '../Atoms/Input';
import Message from '../Atoms/Message';
import Modal from '../Atoms/Modal';
import { Members } from '../Types/types';
import { nanoid } from 'nanoid';
import { doc, runTransaction } from 'firebase/firestore';
import { db } from '../../firebase';
import { UserAuth } from '../../context/AuthContext';
import * as Yup from 'yup';

interface NewMemberProps {
  unclosable?: boolean;
}

const NewMember: React.FC<NewMemberProps> = ({ unclosable }) => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const { openNewUserModal, hideAllModals } = useModalContext();
  const { user } = UserAuth();

  const NewMemberSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Moc krátké!').max(16, 'Moc dlouhé!').required('Vyžadováno'),
  });

  const initialValues: Members = {
    id: '',
    name: '',
    points: 0,
    img: '',
    completed_tasks: 0,
  };

  const createNewMember = async (values: Members) => {
    try {
      setError(false);
      setMessage('');
      await runTransaction(db, async (transaction) => {
        const ref = doc(db, 'users', user?.uid);

        const sfDoc = await transaction.get(ref);

        if (!sfDoc.exists()) {
          return false;
        }

        const member: Members = {
          id: nanoid(),
          name: values.name,
          points: values.points,
          img: '',
          completed_tasks: 0,
        };

        const newMember = [...sfDoc.data().members, member];
        transaction.update(ref, { members: newMember });
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
      open={openNewUserModal}
      onClose={() => (unclosable ? {} : hideAllModals())}
      title="Přidat uživatele"
      key="createMemberModal"
      onModalEnter={() => {
        setMessage('');
        setError(false);
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={NewMemberSchema}
        onSubmit={async (values, { resetForm }) => {
          const response = await createNewMember(values);

          if (response) {
            setMessage('Uživatel byl úspěšně přidán!');
            resetForm();
          }
        }}
        key="newuserFormik"
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-5">
            <FormInput name="name" label="Jak se bude jmenovat?" placeholder="Daniel" />
            {!!message && <Message isError={error} text={message} />}
            <Button isSubmit disabled={isSubmitting} loading={isSubmitting}>
              <>Přidat uživatele</>
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default NewMember;
