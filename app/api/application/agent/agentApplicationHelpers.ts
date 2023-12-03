import { ProductType } from '@/src/types/Product';

export interface AgentFormRequestBody {
  name: string;
  type: ProductType;
  phone: string;
  id: string;
}

export const getAgentApplicationUrl = (type: ProductType) => {
  switch (type) {
    case 'flats':
      return `${process.env.API_BASE_URL}/res-apps`;
    case 'houses-and-lots':
      return `${process.env.API_BASE_URL}/res-apps`;
    case 'commercial':
      return `${process.env.API_BASE_URL}/comm-apps`;
    default:
      return null as never;
  }
};

const getComponentType = (type: ProductType) => {
  switch (type) {
    case 'flats':
      return 'item.apartment';
    case 'houses-and-lots':
      return 'item.house';
    default:
      return null as never;
  }
};

const getDynamicField = (type: ProductType) => {
  switch (type) {
    case 'flats':
      return 'apart_item';
    case 'houses-and-lots':
      return 'house_item';
    default:
      return null as never;
  }
};

export const getAgentFormBodyByType = ({ id, name, phone, type }: AgentFormRequestBody) => {
  const body = {
    data: {
      name,
      phone,
      type: 'купить',
      items: [
        {
          __component: getComponentType(type),
          [getDynamicField(type)]: {
            connect: [
              {
                id,
              },
            ],
          },
        },
      ],
    },
  };

  return JSON.stringify(body);
};
