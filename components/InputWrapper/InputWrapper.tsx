import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import Typography from '@/components/Typography';

interface InputWrapperProps extends PropsWithChildren {
  label: string;
  subLabel?: string | React.ReactNode | React.ReactElement;
  wrapperClassName?: string;
}

const InputWrapper = ({ label, children, subLabel, wrapperClassName }: InputWrapperProps) => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-y-2', 'flex-auto', wrapperClassName)}>
      <div className={clsx('flex', 'gap-x-1')}>
        <Typography>
          {label}
          {subLabel && ','}
        </Typography>

        {subLabel && <p className={clsx('text-[20px]', 'text-[#d9d9d9]')}>{subLabel}</p>}
      </div>
      {children}
    </div>
  );
};

export default InputWrapper;
