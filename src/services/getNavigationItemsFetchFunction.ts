import { AbstractNavigationApi } from '@/src/api/NavigationApi';
import { AppRoutes } from '@/src/enums/AppRoutes';

const getNavigationItemsFetchFunction =
  (api: AbstractNavigationApi) =>
  async (): Promise<
    Array<{
      title: string;
      to: AppRoutes;
    }>
  > => {
    const { data } = await api.getNavigationItems();

    return data.attributes.section.map((item) => ({ title: item.navigation_title, to: item.to }));
  };

export default getNavigationItemsFetchFunction;
