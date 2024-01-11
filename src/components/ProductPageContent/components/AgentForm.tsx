'use client';

import clsx from 'clsx';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

import AgentPlaceholder from '@/public/agentPlaceholder.jpg';
import PhoneIcon from '@/public/phoneIcon.svg';
import CrossIcon from '@/public/plus.svg';
import Button from '@/src/components/common/Button';
import CustomerForm from '@/src/components/common/CustomerForm';
import Typography from '@/src/components/common/Typography';
import { WindowWidth } from '@/src/enums/Width';
import { phoneNumberMask } from '@/src/helpers/phoneNumberMask';
import { useWindowSize } from '@/src/hooks/useWindowSize';
import { sendAgentApplication } from '@/src/services/applicationServices';
import { handleContactsViews } from '@/src/services/localStorageServices';
import { DetailedCommercialItem } from '@/src/types/Commercial';
import { DetailedFlatItem } from '@/src/types/Flats';
import { DetailedHousesAndLotsItem } from '@/src/types/HousesAndLots';
import { ProductType } from '@/src/types/Product';

interface AgentFormProps {
  agentData?:
    | DetailedFlatItem['agents']
    | DetailedHousesAndLotsItem['agents']
    | DetailedCommercialItem['agents'];
  type: ProductType;
  productId: string;
}

const getPhone = (phone: string, isVisible: boolean) => {
  return isVisible ? phone : phone.substring(0, phone.length - 9) + 'XXXXXXXXX';
};

const AgentForm = ({ agentData, type, productId }: AgentFormProps) => {
  const breakpoint = useWindowSize();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPhoneVisible, setIsPhoneVisible] = useState<boolean>(false);

  if (!agentData) {
    return null;
  }

  const { fullName, phone1, phone2, position } = agentData;

  const handleShowContacts = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsPhoneVisible(true);
    await handleContactsViews(type, productId);
  };

  const handleApply = async ({ name, phone }: { name: string; phone: string }) => {
    await sendAgentApplication({
      id: productId,
      name: name,
      phone: phone as string,
      type,
    });
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const renderAgentForm = () => {
    return (
      <div
        className={clsx(
          'flex',
          'min-[1440px]:max-w-xs',
          'min-[1440px]:flex-col',
          'sm:flex-row',
          'flex-col',
          'w-full',
          'h-full',
        )}
      >
        <div
          className={clsx(
            'bg-primary-bold',
            'flex',
            'justify-between',
            'items-end',
            'p-4',
            'flex-1',
          )}
          style={{
            minWidth: AgentPlaceholder.width + 32,
          }}
        >
          <div className={clsx('flex', 'flex-col', 'gap-4', 'w-full', 'h-full')}>
            <Image alt="agent" src={AgentPlaceholder} className={'mx-auto h-full w-auto'} />

            <Typography fontSize={12} color="text-[#B1B1B1]">
              {position || 'Агент по недвижимости'}
            </Typography>
            <Typography fontSize={24} fontWeight="medium">
              {fullName}
            </Typography>
          </div>
        </div>
        <div className="w-full grid">
          <div
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
            <div className={clsx('flex', 'flex-col')}>
              <div className="flex gap-2">
                <Image alt="phone" src={PhoneIcon} />
                {isPhoneVisible ? (
                  <a href={`tel:${phone1}`}>
                    <Typography className="!text-lg" fontWeight="medium" color="#000000">
                      {phoneNumberMask(getPhone(phone1, isPhoneVisible))}
                    </Typography>
                  </a>
                ) : (
                  <Typography className="!text-lg" fontWeight="medium" color="#000000">
                    {phoneNumberMask(getPhone(phone1, isPhoneVisible))}
                  </Typography>
                )}
              </div>
              {phone2 && (
                <div className="flex gap-2">
                  <Image alt="phone" src={PhoneIcon} />
                  {isPhoneVisible ? (
                    <a href={`tel:${phone2}`}>
                      <Typography className="!text-lg" fontWeight="medium" color="#000000">
                        {phoneNumberMask(getPhone(phone2, isPhoneVisible))}
                      </Typography>
                    </a>
                  ) : (
                    <Typography className="!text-lg" fontWeight="medium" color="#000000">
                      {phoneNumberMask(getPhone(phone2, isPhoneVisible))}
                    </Typography>
                  )}
                </div>
              )}
            </div>
            {!isPhoneVisible && (
              <button
                onClick={handleShowContacts}
                className={clsx('text-black', 'underline', 'text-sm', 'opacity-50')}
              >
                Показать контакты
              </button>
            )}
          </div>
          <CustomerForm onApply={handleApply} />
        </div>
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
        <LazyMotion features={domAnimation}>
          <m.div
            initial={{
              position: 'fixed',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 30,
              height: '100dvh',
              bottom: 0,
              left: 0,
              right: 0,
              y: '100%',
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
          </m.div>
        </LazyMotion>
      )}
    </>
  );
};

export default AgentForm;
