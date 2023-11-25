import { usePathname } from 'next/navigation';

import { ViewType } from '@/src/types/ViewType';
export const useViewType = (): ViewType => {
  const pathname = usePathname();

  const splitted = pathname.split('/');
  const lastItem =
    (splitted[splitted.length - 1] as ViewType) === 'map' ||
    (splitted[splitted.length - 1] as ViewType) === 'list';

  return lastItem ? (splitted[splitted.length - 1] as ViewType) : 'list';
};
