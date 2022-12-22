import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import Button from '../Atoms/Button';
import FormInput from '../Atoms/Input';
import * as Yup from 'yup';
import { LoginProps } from '../Types/types';
import { useRouter } from 'next/router';
import Message from '../Atoms/Message';

const Login = () => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const { signIn } = UserAuth();
  const router = useRouter();

  const signInUser = async ({ password, email }: LoginProps): Promise<boolean> => {
    try {
      setError(false);
      setMessage('');
      await signIn(email, password);
      return true;
    } catch (error: any) {
      console.log(error.code);
      if (
        error.code === 'auth/invalid-email' ||
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/user-not-found'
      ) {
        setError(true);
        setMessage('Neplatný email nebo heslo.');
      } else {
        setError(true);
        setMessage('Neznámá chyba. Zkuste to prosím později.');
      }
      return false;
    }
  };

  const redirectAfterLogin = () => {
    setMessage('Přihlášení bylo úspěšně, probíhá přesměrování..');
    setTimeout(() => {
      router.push('/member');
    }, 1500);
  };

  const LoginSchema = Yup.object().shape({
    password: Yup.string().min(6, 'Moc krátké!').required('Vyžadováno'),
    email: Yup.string().email('Neplatná emailová adresa!').required('Vyžadováno'),
  });

  return (
    <div className=" bg-secondary-white dark:bg-secondary-black p-5 rounded-md">
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          const res = await signInUser(values);
          res && redirectAfterLogin();
        }}
        validationSchema={LoginSchema}
        key="loginformik"
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-5 ">
            <FormInput name="email" label="Emailová adresa:" placeholder="danielbilek@seznam.cz" />
            <FormInput name="password" type="password" label="Heslo:" placeholder="****" />
            {!!message && <Message isError={error} text={message} />}
            <Button gradient isSubmit disabled={isSubmitting} loading={isSubmitting}>
              <>Přihlásit se</>
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
