'use client';

import clsx from 'clsx';
import { useState } from 'react';

import Button from '@/src/components/common/Button/Button';
import CheckboxGroup from '@/src/components/common/CheckboxGroup/CheckboxGroup';
import Typography from '@/src/components/common/Typography/Typography';

const ApplicationField = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [checkedValue, setCheckedValue] = useState<string>('');
  return (
    <form
      className={clsx(
        'bg-[#343434]',
        'w-full',
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'py-16',
        'gap-y-16',
      )}
    >
      <Typography fontSize={48}>Оставьте заявку и мы ответим на все ваши вопросы</Typography>
      <div className={clsx('flex', 'gap-8')}>
        <input
          placeholder="Имя"
          className={clsx('w-full', 'text-2xl', 'border-b', 'border-secondary', 'text-white')}
        />
        <input
          type="tel"
          placeholder="+375 25 784 65 47"
          className={clsx('w-full', 'text-2xl', 'border-b', 'border-secondary', 'text-white')}
        />
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
      />

      <div className={clsx('flex', 'flex-col', 'gap-y-4', 'mt-8')}>
        <label
          className={clsx(
            'text-white',
            'text-base',
            'flex',
            'justify-center',
            'items-center',
            'font-light',
          )}
        >
          <input
            onChange={() => setIsChecked(!isChecked)}
            className={clsx('w-4', 'h-4', 'mr-3')}
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
          disabled={!isChecked || !checkedValue}
          className={clsx('disabled:pointer-events-none')}
        >
          Оставить заявку
        </Button>
      </div>
    </form>
  );
};

export default ApplicationField;
