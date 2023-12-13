'use client';

import clsx from 'clsx';
import { useState } from 'react';

import Button from '@/src/components/common/Button/Button';
import Typography from '@/src/components/common/Typography/Typography';
import { formatToNumber } from '@/src/helpers/formatToNumber';
import { removeDigits } from '@/src/helpers/removeDigits';
import { sendTrainingApplication } from '@/src/services/applicationServices';

const defaultFormState = {
  isChecked: false,
  nameValue: '',
  phoneValue: '',
};
const PHONE_NUMBER_LENGTH = 9;

const TrainingForm = ({ id }: { id: string }) => {
  const [formState, setFormState] = useState<{
    isChecked: boolean;
    nameValue: string;
    phoneValue: string;
  }>(defaultFormState);

  const disabled = !(
    formState.isChecked &&
    formState.phoneValue.length === PHONE_NUMBER_LENGTH &&
    formState.nameValue.length
  );

  const onApply = async () => {
    if (formState.phoneValue && formState.nameValue) {
      sendTrainingApplication({
        name: formState.nameValue,
        phone: formState.phoneValue,
        id,
      });
      setFormState(defaultFormState);
    }
  };

  return (
    <form
      id="application"
      className={clsx(
        'bg-[#343434]',
        'w-full',
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'lg:py-16',
        'md:py-8',
        'py-4',
        'gap-8',
        'lg:px-10',
        'px-4',
      )}
    >
      <Typography fontSize={48} className={clsx('lg:text-5xl', 'text-xl', 'text-center')}>
        Записаться на тренинг
      </Typography>
      <Typography fontSize={24} fontWeight="light" className="text-center">
        Оставьте заявку и наши специалисты перезвонят вам для подтверждения
      </Typography>
      <div className={clsx('flex', 'gap-8', 'flex-wrap', 'justify-center')}>
        <label
          className={clsx(
            'lg:text-2xl',
            'md:text-xl',
            'sm:w-2/5',
            'w-full',
            'text-base',
            'border-b',
            'border-secondary',
            'text-white',
          )}
        >
          <input
            placeholder="Имя"
            value={formState.nameValue}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, nameValue: removeDigits(e.target.value) }))
            }
            className="w-full"
          />
        </label>
        <label
          className={clsx(
            'lg:text-2xl',
            'md:text-xl',
            'sm:w-2/5',
            'w-full',
            'text-base',
            'border-b',
            'border-secondary',
            'text-white',
            'flex',
            'items-end',
            'gap-1',
          )}
        >
          +375
          <input
            value={formState.phoneValue}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                phoneValue: formatToNumber(e.target.value, PHONE_NUMBER_LENGTH),
              }))
            }
            className="w-full"
          />
        </label>
      </div>
      <div className={clsx('flex', 'flex-col', 'gap-y-4')}>
        <label
          className={clsx(
            'text-white',
            'md:text-base',
            'text-xs',
            'flex',
            'justify-center',
            'items-center',
            'font-light',
            'text-center',
            'hover:cursor-pointer',
          )}
        >
          <input
            onChange={() => setFormState((prev) => ({ ...prev, isChecked: !prev.isChecked }))}
            className={clsx('md:w-4', 'md:h-4', 'md:mr-3', 'w-[10px]', 'h-[10px]', 'mr-1')}
            type="checkbox"
            name="agreement"
            checked={formState.isChecked}
          />
          Я согласен(а) с обработкой моих персональных данных
        </label>
        <Button
          onClick={(e) => {
            e.preventDefault();
            onApply();
          }}
          disabled={disabled}
          className={clsx('disabled:pointer-events-none', 'disabled:opacity-50')}
        >
          Оставить заявку
        </Button>
      </div>
    </form>
  );
};

export default TrainingForm;
