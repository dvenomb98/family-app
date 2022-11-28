import { Form, Formik } from 'formik';
import React from 'react';
import { UserAuth } from '../../context/AuthContext';
import Button from '../Atoms/Button';
import FormInput from '../Atoms/Input';
import * as Yup from 'yup';

const Register = () => {
  const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too short!').max(20, 'Moc dlouhé!').required('Required'),
    password: Yup.string().min(6, 'Moc krátké!').required('Required'),
    email: Yup.string().email('Neplatná emailová adresa!').required('Required'),
    repeatPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Hesla se neshodují!'),
  });

  return (
    <div className=" bg-secondary-white dark:bg-secondary-black p-5 rounded-md">
      <Formik
        initialValues={{ email: '', password: '', name: '', repeatPassword: '' }}
        onSubmit={async (values) => console.log(values)}
        validationSchema={RegisterSchema}
        key="loginformik"
      >
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
          <Button isSubmit gradient text="Registrovat se" />
        </Form>
      </Formik>
    </div>
  );
};

export default Register;
