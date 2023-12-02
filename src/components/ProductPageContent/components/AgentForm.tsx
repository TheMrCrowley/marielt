'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

import AgentPlaceholder from '@/public/agentPlaceholder.png';
import PhoneIcon from '@/public/phoneIcon.svg';
import Typography from '@/src/components/common/Typography';
import { formatToNumber } from '@/src/helpers/formatToNumber';
import { DetailedFlatItem } from '@/src/types/Flats';
import { DetailedHousesAndLotsItem } from '@/src/types/HousesAndLots';

interface AgentFormProps {
  agentData: DetailedFlatItem['agents'] | DetailedHousesAndLotsItem['agent'];
}

const AgentForm = ({ agentData }: AgentFormProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isPhoneVisible, setIsPhoneVisible] = useState<boolean>(false);
  const [nameValue, setNameValue] = useState<string>('');
  const [phoneValue, setPhoneValue] = useState<string>('');

  const { fullName, phone1, position } = agentData;

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
            {fullName}
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
          'w-full',
        )}
      >
        <div className={clsx('flex')}>
          <Image alt="phone" src={PhoneIcon} />
          <Typography fontSize={14} fontWeight="medium" color="#000000">
            {isPhoneVisible ? phone1 : phone1.substring(0, phone1.length - 9) + 'XXXXXXXXX'}
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

        <label
          className={clsx('w-full', 'text-base', 'border-b', 'border-black', 'text-black', 'mb-12')}
        >
          <input
            placeholder="Имя"
            className={clsx('placeholder:text-[#3434347f]')}
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value.replace(/\d/i, ''))}
          />
        </label>
        <label
          className={clsx('w-full', 'text-base', 'border-b', 'border-black', 'text-black', 'mb-12')}
        >
          +375
          <input
            type="tel"
            placeholder=" 25 784 65 47"
            className={clsx('placeholder:text-[#3434347f]')}
            value={phoneValue}
            onChange={(e) => setPhoneValue(formatToNumber(e.target.value))}
          />
        </label>
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
            'gap-4',
          )}
        >
          <input
            onChange={() => setIsChecked(!isChecked)}
            className={clsx('w-4', 'h-4', 'bg-transparent', 'outline-none', 'border-none')}
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
          disabled={!isChecked && !(phoneValue.length === 9) && !nameValue.length}
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
