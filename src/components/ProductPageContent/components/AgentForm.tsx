'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';
import PhoneInput from 'react-phone-number-input/input';

import AgentPlaceholder from '@/public/agentPlaceholder.png';
import PhoneIcon from '@/public/phoneIcon.svg';
import CrossIcon from '@/public/plus.svg';
import Button from '@/src/components/common/Button';
import Typography from '@/src/components/common/Typography';
import { WindowWidth } from '@/src/enums/Width';
import { removeDigits } from '@/src/helpers/removeDigits';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import { sendAgentApplication } from '@/src/services/applicationServices';
import { DetailedFlatItem } from '@/src/types/Flats';
import { DetailedHousesAndLotsItem } from '@/src/types/HousesAndLots';
import { ProductType } from '@/src/types/Product';

interface AgentFormProps {
  agentData: DetailedFlatItem['agents'] | DetailedHousesAndLotsItem['agent'];
  type: ProductType;
  productId: string;
}

const defaultFormState = {
  isChecked: false,
  name: '',
  phone: '',
};

const AgentForm = ({ agentData, type, productId }: AgentFormProps) => {
  const breakpoint = useWindowSize();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPhoneVisible, setIsPhoneVisible] = useState<boolean>(false);

  const [formState, setFormState] = useState<{
    name: string;
    phone: string | undefined;
    isChecked: boolean;
  }>(defaultFormState);

  const { fullName, phone1, position } = agentData;

  const disabled = !(
    formState.isChecked &&
    isValidPhoneNumber(formState.phone || '', 'BY') &&
    formState.name.length
  );

  const onApply = async () => {
    if (
      formState.isChecked &&
      isValidPhoneNumber(formState.phone || '', 'BY') &&
      formState.name.length
    ) {
      await sendAgentApplication({
        id: productId,
        name: formState.name,
        phone: formState.phone as string,
        type,
      });
      setFormState(defaultFormState);
    }
  };

  const renderAgentForm = () => {
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
            className={clsx(
              'w-full',
              'text-base',
              'border-b',
              'border-black',
              'text-black',
              'mb-12',
            )}
          >
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
              'mb-12',
            )}
          >
            <PhoneInput
              value={formState.phone}
              onChange={(value) => setFormState((prev) => ({ ...prev, phone: value }))}
              country="BY"
              smartCaret
              withCountryCallingCode
              international
              useNationalFormatForDefaultCountryValue
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
              onApply();
            }}
            disabled={disabled}
            className={clsx(
              'disabled:pointer-events-none',
              'bg-[#262626]',
              'text-white',
              'w-full',
              'py-3',
              'disabled:opacity-50',
            )}
          >
            Оставить заявку
          </button>
        </form>
      </div>
    );
  };

  if (breakpoint >= WindowWidth.SM) {
    return renderAgentForm();
  }

  return (
    <>
      <Button
        className={clsx(
          'fixed',
          'z-20',
          'bottom-5',
          'w-[90vw]',
          'left-[50%]',
          'translate-x-[-50%]',
        )}
        onClick={() => setIsOpen(true)}
      >
        Показать контакты
      </Button>
      {isOpen && (
        <motion.div
          initial={{
            position: 'fixed',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 30,
            bottom: 0,
            left: 0,
            y: '-100%',
            opacity: '0',
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
        >
          <button
            className={clsx(
              'flex',
              'justify-center',
              'items-center',
              'absolute',
              'md:top-4',
              'md:right-4',
              'top-4',
              'right-4',
              'z-20',
            )}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <Image
              src={CrossIcon}
              alt="close-icon"
              className={clsx('md:w-8', 'md:h-8', 'w-5', 'h-5')}
            />
          </button>
          {renderAgentForm()}
        </motion.div>
      )}
    </>
  );
};

export default AgentForm;
