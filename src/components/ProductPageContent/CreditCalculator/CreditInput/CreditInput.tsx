'use client';
import clsx from 'clsx';
import { FC } from 'react';

import InputWrapper from '@/src/components/common/InputWrapper/InputWrapper';
import Typography from '@/src/components/common/Typography/Typography';

interface CreditInputProps {
  labelText: string;
  rightUnits: string;
  placeholder: string;
}

const CreditInput: FC<CreditInputProps> = ({ labelText, rightUnits, placeholder }) => {
  return (
    <InputWrapper label={labelText}>
      <div className={clsx('relative')}>
        {/*TODO: add validation*/}
        <input
          placeholder={placeholder}
          className={clsx('w-full', 'text-2xl', 'border-b', 'border-secondary', 'text-secondary')}
        />
        <Typography
          className={clsx(
            'absolute',
            'right-0',
            'z-10',
            'uppercase',
            'top-1/2',
            '-translate-y-1/2',
            'pointer-events-none',
          )}
          fontWeight="medium"
          fontSize={24}
          color="text-secondary"
        >
          {rightUnits}
        </Typography>
      </div>
    </InputWrapper>
  );
};

export default CreditInput;
