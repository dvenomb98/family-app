import classNames from 'classnames';
import { useField } from 'formik';
import React from 'react';
import { inputBoxClass, inputClass } from './Input';

const FormTextArea: React.FC<any> = ({
  name,
  label,
  placeholder,
  customStyles,
  cols,
  rows,
  ...props
}) => {
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <div className={inputBoxClass}>
      {!!label && <label htmlFor="email">{label}</label>}
      <textarea
        {...field}
        {...props}
        cols={cols}
        rows={rows}
        className={classNames(inputClass, customStyles)}
        placeholder={placeholder}
      />
      {!!errorText && <span className="text-primary-red">{errorText}</span>}
    </div>
  );
};

export default FormTextArea;
