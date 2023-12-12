import { ApplicationFormType } from '@/src/enums/ApplicationForm';
import { ProductType } from '@/src/types/Product';

export const sendGenericApplication = ({
  name,
  phone,
  type,
}: {
  name: string;
  phone: string;
  type: ApplicationFormType;
}) => {
  fetch('/api/application', {
    method: 'POST',
    body: JSON.stringify({
      name,
      phone,
      type,
    }),
  });
};

export const sendAgentApplication = ({
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
  fetch('/api/application/agent', {
    method: 'POST',
    body: JSON.stringify({ type, name, phone, id }),
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
      phone,
      id,
    }),
  });
};

export const sendLeaderApplication = async ({ name, phone }: { name: string; phone: string }) => {
  await fetch('/api/application/leader', {
    method: 'POST',
    body: JSON.stringify({
      name,
      phone,
    }),
  });
};
