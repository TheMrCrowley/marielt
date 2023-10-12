export enum AppRoutes {
  Flats = '/flats',
  HousesAndLots = '/houses-and-lots',
  Commercial = '/commercial',
  Profession = '/profession',
  Careers = '/careers',
  Academy = '/academy',
}

export const navigationMap: Record<keyof typeof AppRoutes, string> = {
  Flats: 'Квартиры',
  Academy: 'Академия MARIELT',
  Careers: 'Вакансии',
  Profession: 'Профессия',
  Commercial: 'Коммерческая недвижимость',
  HousesAndLots: 'Дома и Участки',
};
