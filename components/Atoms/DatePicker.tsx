import React from 'react';
import { useField } from 'formik';
import { inputBoxClass } from './Input';
import classNames from 'classnames';

const datePickerClasses =
  'outline-primary-blue border dark:border-primary-black  rounded-md w-full pl-10 p-3 bg-input-color dark:bg-input-color-dark';

const DatePicker: React.FC<any> = ({ name, label, customClasses, ...props }) => {
  const [field, meta] = useField(name);
  const errorText = meta.error && meta.touched ? meta.error : '';
  const id = `${name}-${field.name}`;
  return (
    <div className={inputBoxClass}>
      {!!label && <label htmlFor={id}>{label}</label>}
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-primary-blue dark:text-gray-200"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="date"
          id={id}
          {...field}
          {...props}
          className={classNames(datePickerClasses, customClasses)}
        />
      </div>

      {!!errorText && <span className="text-primary-red">{errorText}</span>}
    </div>
  );
};

export default DatePicker;
