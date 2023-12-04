export enum AppRoutes {
  Flats = '/flats',
  HousesAndLots = '/houses-and-lots',
  Commercial = '/commercial',
  Profession = '/profession',
  Careers = '/careers',
  Dubai = '/dubai',
}

export enum AppChildRoutes {
  Agent = '/careers/agent',
  Realtor = '/careers/realtor',
  Sales = '/careers/sales',
}

export const navigationMap: Record<keyof typeof AppRoutes, string> = {
  Flats: 'Квартиры',
  Dubai: 'Marielt DUBAI',
  Careers: 'Вакансии',
  Profession: 'Профессия',
  Commercial: 'Коммерческая недвижимость',
  HousesAndLots: 'Дома и Участки',
};
