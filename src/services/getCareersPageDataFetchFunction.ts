import { AbstractCareersApi } from '@/src/api/CareersPageApi';
import { convertToCareersPageDateItem } from '@/src/helpers/careersPageHelpers';
import { CareersPageItem } from '@/src/types/CareersTypes';

const getCareersPageDataFetchFunction =
  (api: AbstractCareersApi) => async (): Promise<CareersPageItem[]> => {
    const { data } = await api.getCareersPageData();

    return convertToCareersPageDateItem(data);
  };

export default getCareersPageDataFetchFunction;
