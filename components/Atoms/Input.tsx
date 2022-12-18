import React from 'react';
import { useField } from 'formik';
import classNames from 'classnames';

export const inputClass =
  'p-3 outline-primary-blue border dark:border-primary-black rounded-md bg-input-color dark:bg-input-color-dark placeholder:text-primary-gray ';
export const inputBoxClass = 'flex flex-col gap-1 w-full';

const FormInput: React.FC<any> = ({ name, label, placeholder, type, customStyles, ...props }) => {
  const [field, meta] = useField({ name });
  const errorText = meta.error && meta.touched ? meta.error : '';
  const id = `${name}-${field.name}`;

  return (
    <div className={inputBoxClass}>
      {!!label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
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
