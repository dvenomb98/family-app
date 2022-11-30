import React from 'react';
import { useField } from 'formik';
import classNames from 'classnames';

export const selectClass =
  'p-3 outline-primary-blue border dark:border-primary-black rounded-md bg-gray-200 dark:bg-gray-500 placeholder:text-gray-400 ';
export const selectBoxClass = 'flex flex-col gap-1 ';

const FormSelect: React.FC<any> = ({ name, label, options, customStyles, ...props }) => {
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <div className={selectBoxClass}>
      {!!label && <label htmlFor="email">{label}</label>}
      <select {...field} {...props} className={classNames(selectClass, customStyles)}>
        <option selected disabled>
          Vyberte jednu z možností
        </option>
        {options.map(({ label, value }: any) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {!!errorText && <span className="text-primary-red">{errorText}</span>}
    </div>
  );
};

export default FormSelect;
