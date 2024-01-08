import { AbstractTeamPageApi } from '@/src/api/teamPage';

const getTeamPageDataFetchFunction = (api: AbstractTeamPageApi) => async (): Promise<string> => {
  const description = await api.getTeamPageDescription();

  return description.data.attributes.text;
};

export default getTeamPageDataFetchFunction;
