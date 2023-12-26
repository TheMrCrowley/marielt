import { AbstractTrainingsApi } from '@/src/api/academyPage';
import { convertToTraining } from '@/src/helpers/academyPage/trainingHelpers';
import { Training } from '@/src/types/TrainingType';

const getTrainingByIdFetchFunction =
  (api: AbstractTrainingsApi) =>
  async (id: string): Promise<Training> => {
    const { data } = await api.getTrainingById(id);

    return convertToTraining(data);
  };

export default getTrainingByIdFetchFunction;
