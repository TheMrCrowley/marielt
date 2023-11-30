import { CreditStrapiResponse, StrapiFindResponse } from '@/src/types/StrapiTypes';

export const getInterestRate = async () => {
  const interestRate = await fetch(`${process.env.API_BASE_URL}/credits`, { cache: 'no-cache' });
  const { data } = (await interestRate.json()) as StrapiFindResponse<CreditStrapiResponse>;

  return data.map((credit) => credit.attributes.interest_rate)[0];
};
