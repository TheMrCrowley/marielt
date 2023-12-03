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
