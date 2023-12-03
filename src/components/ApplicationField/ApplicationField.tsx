'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';
import PhoneInput from 'react-phone-number-input/input';

import Button from '@/src/components/common/Button/Button';
import CheckboxGroup from '@/src/components/common/CheckboxGroup/CheckboxGroup';
import Typography from '@/src/components/common/Typography/Typography';

const ApplicationField = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [checkedValue, setCheckedValue] = useState<string>('');
  const [nameValue, setNameValue] = useState<string>('');
  const [phoneValue, setPhoneValue] = useState<string | undefined>('');

  const disabled = !(
    isChecked &&
    checkedValue &&
    isValidPhoneNumber(phoneValue || '', 'BY') &&
    nameValue.length
  );

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
        Оставьте заявку и мы ответим на все ваши вопросы
      </Typography>
      <div className={clsx('flex', 'gap-8')}>
        <label
          className={clsx(
            'w-full',
            'lg:text-2xl',
            'md:text-xl',
            'text-base',
            'border-b',
            'border-secondary',
            'text-white',
          )}
        >
          <input
            placeholder="Имя"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
        </label>
        <label
          className={clsx(
            'w-full',
            'lg:text-2xl',
            'md:text-xl',
            'text-base',
            'border-b',
            'border-secondary',
            'text-white',
          )}
        >
          <PhoneInput
            value={phoneValue}
            onChange={setPhoneValue}
            country="BY"
            smartCaret
            withCountryCallingCode
            international
            useNationalFormatForDefaultCountryValue
          />
        </label>
      </div>
      <CheckboxGroup
        isMulti={false}
        items={[
          'Продать жилой объект',
          'Продать/сдать в аренду коммерческий объект',
          'Интересует работа',
        ].map((item) => ({
          label: item,
          value: item,
        }))}
        onChange={(value) => {
          setCheckedValue(value);
        }}
        values={checkedValue}
        checkBoxWrapperClassName={clsx('justify-center', 'items-center')}
        checkBoxClassName="!flex-auto"
      />

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
          )}
        >
          <input
            onChange={() => setIsChecked(!isChecked)}
            className={clsx('md:w-4', 'md:h-4', 'md:mr-3', 'w-[10px]', 'h-[10px]', 'mr-1')}
            type="checkbox"
            name="agreement"
            checked={isChecked}
          />
          Я согласен(а) с обработкой моих персональных данных
        </label>
        <Button
          onClick={(e) => {
            e.preventDefault();
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

export default ApplicationField;
