import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useModalContext } from '../../context/ModalContext';
import Button from '../Atoms/Button';
import FormInput from '../Atoms/Input';
import Message from '../Atoms/Message';
import Modal from '../Atoms/Modal';

const ModalFormikDraft = () => {
  const { openCreateTaskModal } = useModalContext();
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const initialValues = {
    title: '',
  };

  return (
    <Modal
      onModalEnter={() => {
        setMessage('');
        setError(false);
      }}
      key="createTaskModal"
      open={openCreateTaskModal}
      title="Vytvořit úkol"
      description="Musíme doma něco nového udělat? Založte si úkol."
    >
      <Formik
        initialValues={initialValues}
        // validationSchema={}
        onSubmit={async (values) => {
          console.log(values);
        }}
        key="createTaskFormik"
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-5">
            <FormInput name="name" label="Jak se bude jmenovat?" placeholder="Daniel" />
            {!!message && <Message isError={error} text={message} />}
            <Button isSubmit loading={isSubmitting}>
              <>Přidat uživatele</>
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ModalFormikDraft;
