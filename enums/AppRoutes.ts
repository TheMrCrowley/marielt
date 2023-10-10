export enum AppRoutes {
  Apartments = '/apartments',
  HouseAndLots = '/house-and-lots',
  Commercial = '/commercial',
  Profession = '/profession',
  Careers = '/careers',
  Academy = '/academy',
}

export const navigationMap: Record<keyof typeof AppRoutes, string> = {
  Apartments: 'Квартиры',
  Academy: 'Академия MARIELT',
  Careers: 'Вакансии',
  Profession: 'Профессия',
  Commercial: 'Коммерческая недвижимость',
  HouseAndLots: 'Дома и Участки',
};
