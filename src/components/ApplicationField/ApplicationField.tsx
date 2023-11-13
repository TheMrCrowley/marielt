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
        'px-10',
      )}
    >
      <Typography fontSize={48} className={clsx('lg:text-5xl', 'text-xl', 'text-center')}>
        Оставьте заявку и мы ответим на все ваши вопросы
      </Typography>
      <div className={clsx('flex', 'gap-8')}>
        <input
          placeholder="Имя"
          className={clsx('w-full', 'text-2xl', 'border-b', 'border-secondary', 'text-white')}
        />
        {/**TODO: min validation, mask for tel-input? */}
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
        wrapperClassName={clsx('items-center', 'justify-center')}
      />

      <div className={clsx('flex', 'flex-col', 'gap-y-4', 'mt-8')}>
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
