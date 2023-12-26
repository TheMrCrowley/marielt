'use client';

import clsx from 'clsx';
import { useState } from 'react';

import Button from '@/src/components/common/Button/Button';
import CheckboxGroup from '@/src/components/common/CheckboxGroup/CheckboxGroup';
import Select from '@/src/components/common/Select';
import Title from '@/src/components/common/Title';
import Typography from '@/src/components/common/Typography/Typography';
import { ApplicationFormType, applicationFormOptions } from '@/src/enums/ApplicationForm';
import { formatToNumber } from '@/src/helpers/formatToNumber';
import { removeDigits } from '@/src/helpers/removeDigits';
import { sendGenericApplication, toastApplication } from '@/src/services/applicationServices';

const defaultFormState = {
  checkedValue: '',
  isChecked: false,
  nameValue: '',
  phoneValue: '',
};

const PHONE_NUMBER_LENGTH = 9;

const ApplicationField = ({ type = 'product' }: { type?: 'home' | 'product' }) => {
  const [formState, setFormState] = useState<{
    isChecked: boolean;
    checkedValue: string;
    nameValue: string;
    phoneValue: string;
  }>(defaultFormState);

  const disabled = !(
    formState.isChecked &&
    formState.checkedValue &&
    formState.phoneValue.length === PHONE_NUMBER_LENGTH &&
    formState.nameValue.length
  );

  const onApply = async () => {
    if (formState.checkedValue && formState.phoneValue && formState.nameValue) {
      await sendGenericApplication({
        name: formState.nameValue,
        phone: formState.phoneValue,
        type: formState.checkedValue as ApplicationFormType,
      });
      setFormState(defaultFormState);
    }
  };

  if (type === 'home') {
    return (
      <section
        className={clsx(
          'backdrop-blur-md',
          'flex',
          'flex-col',
          'gap-4',
          'items-center',
          'md:py-16',
          'px-8',
          'md:max-w-lg',
          'max-w-xs',
          'md:self-stretch',
          'self-center',
        )}
      >
        <Title>Оставьте заявку</Title>
        <Typography className="text-center">
          Наши специалисты ответят на все ваши вопросы
        </Typography>
        <form className={clsx('flex', 'flex-col', 'gap-10', 'w-full', 'md:max-w-xs')}>
          <label
            className={clsx(
              'lg:text-2xl',
              'md:text-xl',
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
          <Select
            isMulti={false}
            items={applicationFormOptions}
            values={formState.checkedValue}
            onChange={(selected) => setFormState((prev) => ({ ...prev, checkedValue: selected }))}
            label="Тема обращения"
          />
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
              toastApplication(onApply);
            }}
            disabled={disabled}
            className={clsx('disabled:pointer-events-none', 'disabled:opacity-50')}
          >
            Оставить заявку
          </Button>
        </form>
      </section>
    );
  }

  return (
    <form
      className={clsx(
        'bg-primary-medium',
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
        Оставьте заявку, и мы ответим на все ваши вопросы
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

      <CheckboxGroup
        isMulti={false}
        items={applicationFormOptions}
        onChange={(value) => setFormState((prev) => ({ ...prev, checkedValue: value }))}
        values={formState.checkedValue}
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
            toastApplication(onApply);
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
