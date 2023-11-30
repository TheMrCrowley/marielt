'use client';
import clsx from 'clsx';
import { FC } from 'react';

import InputWrapper from '@/src/components/common/InputWrapper/InputWrapper';
import Typography from '@/src/components/common/Typography/Typography';
import { formatToNumber } from '@/src/helpers/formatToNumber';

interface CreditInputProps {
  labelText: string;
  rightUnits: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const CreditInput: FC<CreditInputProps> = ({
  labelText,
  rightUnits,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <InputWrapper label={labelText}>
      <div className={clsx('relative')}>
        {/*TODO: add validation*/}
        <input
          value={value}
          onChange={(e) => onChange(formatToNumber(e.target.value))}
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
