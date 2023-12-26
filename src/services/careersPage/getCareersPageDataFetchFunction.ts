import { AbstractCareersApi } from '@/src/api/careersPage';
import { convertToCareersPageDateItem } from '@/src/helpers/careersPage/careersPageHelpers';
import { CareersPageItem } from '@/src/types/CareersTypes';

const getCareersPageDataFetchFunction =
  (api: AbstractCareersApi) => async (): Promise<CareersPageItem[]> => {
    const { data } = await api.getCareersPageData();

    return convertToCareersPageDateItem(data);
  };

export default getCareersPageDataFetchFunction;
