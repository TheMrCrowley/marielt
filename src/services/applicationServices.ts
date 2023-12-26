import { toast } from 'react-toastify';

import { ApplicationFormType } from '@/src/enums/ApplicationForm';
import { ProductType } from '@/src/types/Product';

const PHONE_NUMBER_CODE = '+375';

export const toastApplication = (promiseFn: () => Promise<void>) =>
  toast.promise(
    promiseFn,
    {
      pending: 'Заявка отправляется',
      success: 'Заявка отправлена',
      error: 'Что-то пошло не так',
    },
    {
      position: 'bottom-center',
      autoClose: 2000,
      draggablePercent: 60,
      className: '!bg-primary-medium !text-white',
      closeButton: false,
      progressClassName: '!bg-secondary',
    },
  );

export const sendGenericApplication = async ({
  name,
  phone,
  type,
}: {
  name: string;
  phone: string;
  type: ApplicationFormType;
}) => {
  await fetch('/api/application', {
    method: 'POST',
    body: JSON.stringify({
      name,
      phone: PHONE_NUMBER_CODE + phone,
      type,
    }),
  });
};

export const sendAgentApplication = async ({
  type,
  name,
  phone,
  id,
}: {
  type: ProductType;
  name: string;
  phone: string;
  id: string;
}) => {
  await fetch('/api/application/agent', {
    method: 'POST',
    body: JSON.stringify({ type, name, phone: PHONE_NUMBER_CODE + phone, id }),
  });
};

export const sendTrainingApplication = async ({
  name,
  phone,
  id,
}: {
  name: string;
  phone: string;
  id: string;
}) => {
  await fetch('/api/application/training', {
    method: 'POST',
    body: JSON.stringify({
      name,
      phone: PHONE_NUMBER_CODE + phone,
      id,
    }),
  });
};

export const sendLeaderApplication = async ({ name, phone }: { name: string; phone: string }) => {
  await fetch('/api/application/leader', {
    method: 'POST',
    body: JSON.stringify({
      name,
      phone: PHONE_NUMBER_CODE + phone,
    }),
  });
};
