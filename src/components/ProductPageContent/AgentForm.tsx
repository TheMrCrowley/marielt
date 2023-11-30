'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

import AgentPlaceholder from '@/public/agentPlaceholder.png';
import PhoneIcon from '@/public/phoneIcon.svg';
import Typography from '@/src/components/common/Typography';

interface AgentFormProps {
  name: string;
  phoneNumber: string;
  position?: string;
}

const AgentForm = ({ name, phoneNumber, position }: AgentFormProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isPhoneVisible, setIsPhoneVisible] = useState<boolean>(false);

  return (
    <div
      className={clsx(
        'flex',
        'min-[1440px]:max-w-[337px]',
        'min-[1440px]:flex-col',
        'sm:flex-row',
        'flex-col',
        'w-full',
      )}
    >
      <div
        className={clsx(
          'bg-[#262626]',
          'flex',
          'justify-between',
          'items-end',
          'p-4',
          'relative',
          'before:block',
          'before:absolute',
          'before:w-2/5',
          'before:h-4/5',
          'before:border-4',
          'before:border-secondary',
          'before:bottom-4',
          'before:right-8',
          'before:z-10',
        )}
        style={{
          minHeight: AgentPlaceholder.height + 24,
          minWidth: AgentPlaceholder.width + 32,
        }}
      >
        <div className={clsx('flex', 'flex-col', 'gap-4', 'relative', 'z-20')}>
          <Typography fontSize={12} color="text-[#B1B1B1]">
            {position || 'Агент по недвижимости'}
          </Typography>
          <Typography fontSize={24} fontWeight="medium">
            {name}
          </Typography>
        </div>
        <Image
          alt="agent"
          src={AgentPlaceholder}
          className={clsx('block', 'absolute', 'right-0', 'bottom-0', 'z-10')}
        />
      </div>
      <form
        className={clsx(
          'bg-secondary',
          'flex',
          'flex-col',
          'justify-center',
          'items-center',
          'p-6',
        )}
      >
        <div className={clsx('flex')}>
          <Image alt="phone" src={PhoneIcon} />
          <Typography fontSize={14} fontWeight="medium" color="#000000">
            {isPhoneVisible
              ? phoneNumber
              : phoneNumber.substring(0, phoneNumber.length - 9) + 'XXXXXXXXX'}
          </Typography>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsPhoneVisible(true);
          }}
          className={clsx('text-black', 'underline', 'text-sm', 'opacity-50', 'mb-6')}
        >
          Показать контакты
        </button>
        <input
          placeholder="Имя"
          className={clsx('w-full', 'text-base', 'border-b', 'border-black', 'text-black', 'mb-5')}
        />
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
