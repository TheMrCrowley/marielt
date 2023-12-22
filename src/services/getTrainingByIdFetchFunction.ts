import { AbstractTrainingsApi } from '@/src/api/TrainingsApi';
import { convertToTraining } from '@/src/helpers/trainingHelpers';
import { Training } from '@/src/types/TrainingType';

const getTrainingByIdFetchFunction =
  (api: AbstractTrainingsApi) =>
  async (id: string): Promise<Training> => {
    const { data } = await api.getTrainingById(id);

    return convertToTraining(data);
  };

export default getTrainingByIdFetchFunction;
