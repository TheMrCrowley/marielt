import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

import Typography from '@/components/Typography';
import CrossIcon from '@/public/plus.svg';

interface ChipProps {
  label: string;
  onDelete: () => void;
}

const Chip = ({ label, onDelete }: ChipProps) => {
  return (
    <div
      className={clsx(
        'flex',
        'py-3',
        'px-5',
        'border',
        'border-secondary',
        'rounded-full',
        'justify-center',
        'items-center',
        'gap-x-3',
        'max-w-xs',
      )}
    >
      <button onClick={onDelete}>
        <Image src={CrossIcon.src} alt="delete-icon" width={20} height={20} />
      </button>
      <Typography
        fontSize={16}
        fontWeight="light"
        className={clsx('text-ellipsis', 'whitespace-nowrap', 'overflow-hidden', 'w-full')}
      >
        {label}
      </Typography>
    </div>
  );
};

export default Chip;
