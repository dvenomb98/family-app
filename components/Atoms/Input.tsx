import React from 'react';
import { useField } from 'formik';
import classNames from 'classnames';

export const inputClass =
  'p-3 outline-primary-blue border dark:border-primary-black rounded-md bg-blue-50 dark:text-primary-black';
export const inputBoxClass = 'flex flex-col gap-1 ';

const FormInput: React.FC<any> = ({ name, label, placeholder, type, customStyles, ...props }) => {
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <div className={inputBoxClass}>
      {!!label && <label htmlFor="email">{label}</label>}
      <input
        {...field}
        {...props}
        type={type}
        className={classNames(inputClass, customStyles)}
        placeholder={placeholder}
      />
      {!!errorText && <span className="text-primary-red">{errorText}</span>}
    </div>
  );
};

export default FormInput;
