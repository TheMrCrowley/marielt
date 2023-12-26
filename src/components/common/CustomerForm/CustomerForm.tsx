'use client';

import clsx from 'clsx';
import React, { useState } from 'react';

import { formatToNumber } from '@/src/helpers/formatToNumber';
import { removeDigits } from '@/src/helpers/removeDigits';
import { toastApplication } from '@/src/services/applicationServices';

const defaultFormState = {
  isChecked: false,
  name: '',
  phone: '',
};

const PHONE_NUMBER_LENGTH = 9;

interface CustomerFormProps {
  onApply: (data: { name: string; phone: string }) => Promise<void>;
}

const CustomerForm = ({ onApply }: CustomerFormProps) => {
  const [formState, setFormState] = useState<{
    name: string;
    phone: string;
    isChecked: boolean;
  }>(defaultFormState);

  const disabled = !(
    formState.isChecked &&
    formState.phone.length === PHONE_NUMBER_LENGTH &&
    formState.name.length
  );

  const handleApply = async () => {
    if (
      formState.isChecked &&
      formState.phone.length === PHONE_NUMBER_LENGTH &&
      formState.name.length
    ) {
      await onApply({ name: formState.name, phone: formState.phone as string });
      setFormState(defaultFormState);
    }
  };

  return (
    <form
      className={clsx(
        'bg-secondary',
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'p-6',
        'w-full',
        'gap-4',
      )}
    >
      <label className={clsx('w-full', 'text-base', 'border-b', 'border-black', 'text-black')}>
        <input
          placeholder="Имя"
          className={clsx('placeholder:text-[#3434347f]')}
          value={formState.name}
          onChange={(e) =>
            setFormState((prev) => ({ ...prev, name: removeDigits(e.target.value) }))
          }
        />
      </label>
      <label
        className={clsx(
          'w-full',
          'text-base',
          'border-b',
          'border-black',
          'text-black',
          'flex',
          'item-end',
          'gap-1',
        )}
      >
        +375
        <input
          value={formState.phone}
          onChange={(e) =>
            setFormState((prev) => ({
              ...prev,
              phone: formatToNumber(e.target.value, PHONE_NUMBER_LENGTH),
            }))
          }
          className="w-full"
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
          'gap-4',
          'hover:cursor-pointer',
        )}
      >
        <input
          onChange={() => setFormState((prev) => ({ ...prev, isChecked: !prev.isChecked }))}
          className={clsx('w-4', 'h-4', 'bg-transparent', 'outline-none', 'border-none')}
          type="checkbox"
          name="agreement"
          checked={formState.isChecked}
        />
        Я согласен(а) с обработкой моих персональных данных
      </label>
      <button
        onClick={(e) => {
          e.preventDefault();
          toastApplication(handleApply);
        }}
        disabled={disabled}
        className={clsx(
          'disabled:pointer-events-none',
          'bg-primary-bold',
          'text-white',
          'w-full',
          'py-3',
          'disabled:opacity-50',
        )}
      >
        Оставить заявку
      </button>
    </form>
  );
};

export default CustomerForm;
