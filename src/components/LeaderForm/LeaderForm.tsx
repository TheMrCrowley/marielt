'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';
import PhoneInput from 'react-phone-number-input/input';

import Button from '@/src/components/common/Button/Button';
import Typography from '@/src/components/common/Typography/Typography';
import { removeDigits } from '@/src/helpers/removeDigits';
import { sendLeaderApplication } from '@/src/services/applicationServices';

const defaultFormState = {
  isChecked: false,
  nameValue: '',
  phoneValue: '',
};

const LeaderForm = () => {
  const [formState, setFormState] = useState<{
    isChecked: boolean;
    nameValue: string;
    phoneValue: string | undefined;
  }>(defaultFormState);

  const disabled = !(
    formState.isChecked &&
    isValidPhoneNumber(formState.phoneValue || '', 'BY') &&
    formState.nameValue.length
  );

  const onApply = async () => {
    if (formState.phoneValue && formState.nameValue) {
      sendLeaderApplication({
        name: formState.nameValue,
        phone: formState.phoneValue,
      });
      setFormState(defaultFormState);
    }
  };

  return (
    <form
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
        Хочу присоединиться к команде лидеров
      </Typography>
      <Typography fontSize={24} fontWeight="light" className="text-center">
        Оставьте заявку. Мы с удовольствием ответим на все ваши вопросы и поможем погргузится в мир
        недвижимости
      </Typography>
      <div className={clsx('flex', 'gap-8', 'flex-wrap')}>
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
          )}
        >
          <PhoneInput
            value={formState.phoneValue}
            onChange={(value) => setFormState((prev) => ({ ...prev, phoneValue: value }))}
            country="BY"
            smartCaret
            withCountryCallingCode
            international
            useNationalFormatForDefaultCountryValue
            style={{
              width: '100%',
            }}
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

export default LeaderForm;
