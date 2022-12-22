import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import Button from '../Atoms/Button';
import FormInput from '../Atoms/Input';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { RegisterProps } from '../Types/types';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Message from '../Atoms/Message';

// ADD TYPES
const newUserValues = {
  members: [],
  tasks: [],
  img: '',
};

const Register = () => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();
  const { createUser } = UserAuth();

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too short!').max(20, 'Moc dlouhé!').required('Vyžadováno'),
    password: Yup.string().min(6, 'Moc krátké!').required('Vyžadováno'),
    email: Yup.string().email('Neplatná emailová adresa!').required('Vyžadováno'),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Hesla se neshodují!')
      .required('Vyžadováno'),
  });

  const redirectAfterLogin = () => {
    setMessage('Registrace úspěšná, probíhá přesměrování..');
    setTimeout(() => {
      router.push('/member');
    }, 400);
  };

  const createNewUser = async ({ name, email, password }: RegisterProps): Promise<boolean> => {
    try {
      setError(false);
      setMessage('');
      const created = await createUser(email, password);

      const { user } = created;

      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        ...newUserValues,
      });

      return true;
    } catch (error: any) {
      setError(true);
      setMessage(error.message);
      return false;
    }
  };

  return (
    <div className=" bg-secondary-white dark:bg-secondary-black p-5 rounded-md">
      <Formik
        initialValues={{ email: '', password: '', name: '', repeatPassword: '' }}
        onSubmit={async (values, { resetForm }) => {
          const response = await createNewUser(values);
          if (response) {
            redirectAfterLogin();
            resetForm();
          }
        }}
        validationSchema={RegisterSchema}
        key="registerformik"
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-5 ">
            <FormInput name="name" label="Jméno účtu:" placeholder="Bílkovi" />
            <FormInput name="email" label="Emailová adresa:" placeholder="danielbilek@seznam.cz" />
            <FormInput name="password" type="password" label="Heslo:" placeholder="****" />
            <FormInput
              name="repeatPassword"
              type="password"
              label="Heslo znovu:"
              placeholder="****"
            />
            {!!message && <Message isError={error} text={message} />}
            <Button isSubmit disabled={isSubmitting} loading={isSubmitting} gradient>
              <>Registrovat se</>
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
