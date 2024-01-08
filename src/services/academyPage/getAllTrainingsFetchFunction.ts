import { AbstractTrainingsApi } from '@/src/api/academyPage';

const getAllTrainingsFetchFunction = (api: AbstractTrainingsApi) => async () => {
  const { data } = await api.getAllTrainings();
  return data.filter((item) => item.attributes.description && item.attributes.content);
};

export default getAllTrainingsFetchFunction;
