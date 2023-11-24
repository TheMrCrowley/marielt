'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

import PhoneIcon from '@/public/phoneIcon.svg';
import Typography from '@/src/components/common/Typography';

const AgentForm = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div
      className={clsx(
        'flex',
        'flex-row',
        'min-[1440px]:min-w-[337px]',
        'min-[1440px]:flex-col',
        'w-full',
      )}
    >
      <div className={clsx('bg-[#262626]', 'relative', 'h-[337px]', 'min-w-[337px]')}>
        <Typography fontSize={24} fontWeight="medium" className={clsx('absolute')}>
          Ольга Лазаренкова
        </Typography>
      </div>
      <form
        className={clsx(
          'bg-secondary',
          'flex',
          'flex-col',
          'justify-center',
          'items-center',
          'p-6',
          'w-full',
        )}
      >
        <div className={clsx('flex')}>
          <Image alt="phone" src={PhoneIcon} />
          <Typography fontSize={14} fontWeight="medium" color="#000000">
            +375 29 XXX-XX-XX
          </Typography>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
          className={clsx('text-black', 'underline', 'text-sm', 'opacity-50', 'mb-6')}
        >
          Показать контакты
        </button>
        <input
          placeholder="Имя"
          className={clsx('w-full', 'text-base', 'border-b', 'border-black', 'text-black', 'mb-5')}
        />
        {/**TODO: min validation, mask for tel-input? */}
        <input
          type="tel"
          placeholder="+375 25 784 65 47"
          className={clsx('w-full', 'text-base', 'border-b', 'border-black', 'text-black', 'mb-12')}
        />
        <label
          className={clsx(
            'text-black',
            'text-sm',
            'flex',
            'justify-center',
            'items-center',
            'font-light',
            'text-center',
            'mb-5',
          )}
        >
          <input
            onChange={() => setIsChecked(!isChecked)}
            className={clsx('w-[15px]', 'h-[15px]')}
            type="checkbox"
            name="agreement"
            checked={isChecked}
          />
          Я согласен(а) с обработкой моих персональных данных
        </label>
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
          disabled={!isChecked}
          className={clsx(
            'disabled:pointer-events-none',
            'bg-[#262626]',
            'text-white',
            'w-full',
            'py-3',
          )}
        >
          Оставить заявку
        </button>
      </form>
    </div>
  );
};

export default AgentForm;
