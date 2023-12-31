import { DetailedCommercialItem } from '@/src/types/Commercial';
import { QueryMapType, OptionType } from '@/src/types/Filters';
export enum TransactionTypeValues {
  Business = 'business',
  Sale = 'sale',
  Rent = 'rent',
}

export enum CommercialRootCategoryTypeValues {
  Offices = 'offices',
  Shops = 'shops',
  RestorantCafe = 'restorant-cafe',
  Warehouses = 'warehouses',
  Production = 'production',
  Uchastki = 'uchastki',
  RentBusiness = 'rent-business',
  Garage = 'garage',
  Business = 'business',
}

export enum CommercialCategoryTypeValues {
  Sklad = 'sklad',
  SkladPlusOffice = 'sklad-plus-office',
  Holodilnik = 'holodilnik',
  OtkrytajaPloschadka = 'otkrytaja-ploschadka',
  Construction = 'construction',
  Garazh = 'garazh',
  Mashinomesto = 'mashinomesto',
  ReadyRestaurant = 'ready-restaurant',
  ReadyProizvodstvo = 'ready-proizvodstvo',
  Sto = 'sto',
  ReadyRynok = 'ready-rynok',
  SalonKrasoty = 'salon-krasoty',
  GamingBusiness = 'gaming-business',
  Medicina = 'medicina',
  FitnessCentr = 'fitness-centr',
  BazaOtdyha = 'baza-otdyha',
  ReadyHotel = 'ready-hotel',
  ReadyRoadside = 'ready-roadside',
  Zavod = 'zavod',
  Prod = 'prod',
  Peftebaza = 'neftebaza',
}

export enum CommercialFloorValues {
  First = 'first',
  Last = 'last',
  Ground = 'ground',
}

export const commercialFloorOptions: Record<CommercialFloorValues, string> = {
  [CommercialFloorValues.First]: 'Первый',
  [CommercialFloorValues.Ground]: 'Цокольный',
  [CommercialFloorValues.Last]: 'Последний',
};

export enum CommercialLocationValues {
  House = 'house',
  BusinessCenter = 'business-center',
  ShoppingMall = 'shopping-mall',
  DetachedBuilding = 'detached-building',
  Underground = 'underground',
}

export const commercialLocationOptions: OptionType<CommercialLocationValues> = [
  { value: CommercialLocationValues.House, label: 'В жилом доме' },
  { value: CommercialLocationValues.BusinessCenter, label: 'В бизнес-центре' },
  { value: CommercialLocationValues.ShoppingMall, label: 'В торговом центре' },
  { value: CommercialLocationValues.DetachedBuilding, label: 'Отдельно стоящее здание' },
  { value: CommercialLocationValues.Underground, label: 'В подземном переходе' },
];

export const commercialLocationQueryMap: QueryMapType<CommercialLocationValues> = {
  [CommercialLocationValues.House]: 'в жилом доме',
  [CommercialLocationValues.BusinessCenter]: 'в бизнес центре',
  [CommercialLocationValues.ShoppingMall]: 'в торговом центре',
  [CommercialLocationValues.DetachedBuilding]: 'отдельно стоящее здание',
  [CommercialLocationValues.Underground]: 'в подземном переходе',
};

export enum CommercialFinishingValues {
  With = 'with-finishing',
  Without = 'without-finishing',
}

export const commercialFinishingOptions: OptionType<CommercialFinishingValues> = [
  { value: CommercialFinishingValues.With, label: 'С ремонтом' },
  { value: CommercialFinishingValues.Without, label: 'Без отделки' },
];

export const commercialFinishingQueryMap: QueryMapType<CommercialFinishingValues> = {
  [CommercialFinishingValues.With]: 'с ремонтом',
  [CommercialFinishingValues.Without]: 'без отделки',
};

export enum CommercialWallMaterialValues {
  Panel = 'panel',
  Monolith = 'monolith',
  Brick = 'brick',
  Block = 'block',
}

export const commercialWallMaterialOptions: OptionType<CommercialWallMaterialValues> = [
  { value: CommercialWallMaterialValues.Panel, label: 'Панельный' },
  { value: CommercialWallMaterialValues.Monolith, label: 'Монолитный' },
  { value: CommercialWallMaterialValues.Brick, label: 'Кирпичный' },
  { value: CommercialWallMaterialValues.Block, label: 'Блочный' },
];

export const commercialWallMaterialQueryMap: QueryMapType<CommercialWallMaterialValues> = {
  [CommercialWallMaterialValues.Panel]: 'панельный',
  [CommercialWallMaterialValues.Monolith]: 'монолитный',
  [CommercialWallMaterialValues.Brick]: 'кирпичный',
  [CommercialWallMaterialValues.Block]: 'блочный',
};

export const commercialCharacteristicsMap: Partial<
  Record<
    keyof DetailedCommercialItem['parameters'],
    (value?: string | boolean) => { name: string; value: string }
  >
> = {
  profitability: (value) => ({ name: 'доходность', value: `${value}%` }),
  payback: (value) => ({ name: 'окупаемость(лет)', value: value as string }),
  vat: (value) => ({ name: 'НДС', value: value as string }),
  plotSize: (value) => ({
    name: 'Площадь участка',
    value: `${value} сот.`,
  }),
  isGroundFloor: () => ({
    name: 'Цокольный этаж',
    value: 'Да',
  }),
  ceilingHeight: (value) => ({
    name: 'Высота потолков',
    value: `${value} м`,
  }),
  wallMaterial: (value) => ({
    name: 'Материал стен',
    value: value as string,
  }),
  constructionYear: (value) => ({
    name: 'Год постройки',
    value: value as string,
  }),
  finishing: () => ({
    name: 'Состояние дома',
    value: 'Есть',
  }),
  equipment: () => ({
    name: 'Оборудование',
    value: 'Есть',
  }),
  daylight: () => ({
    name: 'Естественное освещение',
    value: 'Есть',
  }),
  electricity: () => ({
    name: 'Электроснабжение',
    value: 'Есть',
  }),
  heating: () => ({
    name: 'Отопление',
    value: 'Есть',
  }),
  gas: () => ({
    name: 'Газоснабжение',
    value: 'Есть',
  }),
  water: () => ({
    name: 'Вода',
    value: 'Есть',
  }),
  bathroom: () => ({
    name: 'Санузел',
    value: 'Есть',
  }),
  ventilation: () => ({
    name: 'Вентиляция',
    value: 'Есть',
  }),
  sewerage: () => ({
    name: 'Канализация',
    value: 'Есть',
  }),
  furniture: () => ({
    name: 'Мебель',
    value: 'Есть',
  }),
  location: (value) => ({
    name: 'Расположение',
    value: value as string,
  }),
  separateEntrance: () => ({
    name: 'Отдельный вход',
    value: 'Есть',
  }),
  ramp: () => ({
    name: 'Погрузка/разгрузка/рампа',
    value: 'Есть',
  }),
};
