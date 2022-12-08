import classNames from 'classnames';
import React from 'react';

interface AccountBoxProps {
  label: string;
  value: string | number;
  color?: string | undefined;
}

const AccountBox: React.FC<AccountBoxProps> = ({ label, value, color }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className={classNames('text-primary-gray')}>{label}:</p>
      <p className={classNames('font-semibold text-h3', color && color)}>{value}</p>
    </div>
  );
};

export default AccountBox;
