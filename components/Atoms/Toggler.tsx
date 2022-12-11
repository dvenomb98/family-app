import { Switch } from '@headlessui/react';
import React, { FC } from 'react';

interface TogglerProps {
  checked: boolean;
  setFunc: () => void;
  srOnly: string;
}

const Toggler: FC<TogglerProps> = ({ checked, setFunc, srOnly }) => {
  return (
    <Switch
      checked={checked}
      onChange={setFunc}
      className={`${
        checked ? 'bg-input-color-dark' : 'bg-input-color'
      } relative inline-flex h-6 w-11 items-center rounded-full`}
    >
      <span className="sr-only">{srOnly}</span>
      <span
        className={`${
          checked ? 'translate-x-6 bg-secondary-blue' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </Switch>
  );
};

export default Toggler;
