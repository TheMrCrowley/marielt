import { AbstractCreditsApi } from '@/src/api/CreditsApi';

const DEFAULT_INTEREST_RATE = 14.4;

const getInterestRateFetchFunction = (api: AbstractCreditsApi) => async () => {
  const { data } = await api.getInterestRate();

  return data.length ? data[0].attributes.interest_rate : DEFAULT_INTEREST_RATE;
};

export default getInterestRateFetchFunction;
