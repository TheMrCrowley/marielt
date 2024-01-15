import { OptionType, QueryMapType } from '@/src/types/Filters';
import { DetailedFlatItem } from '@/src/types/Flats';

export enum RoominessValues {
  Part = 'part',
  One = 'one',
  Two = 'two',
  Three = 'three',
  FourAndMore = 'fourAndMore',
}

export const roominessOptions: OptionType<RoominessValues> = [
  {
    label: 'Доля',
    value: RoominessValues.Part,
  },
  {
    label: '1',
    value: RoominessValues.One,
  },
  {
    label: '2',
    value: RoominessValues.Two,
  },
  {
    label: '3',
    value: RoominessValues.Three,
  },
  {
    label: '4+',
    value: RoominessValues.FourAndMore,
  },
];

export const roominessFilterTagsMap: Record<RoominessValues, string> = {
  [RoominessValues.Part]: 'Доля',
  [RoominessValues.One]: '1',
  [RoominessValues.Two]: '2',
  [RoominessValues.Three]: '3',
  [RoominessValues.FourAndMore]: '4+',
};

export const roominessQueryMap: QueryMapType<RoominessValues> = {
  [RoominessValues.Part]: ['комната (доля)'],
  [RoominessValues.One]: ['однокомнатная квартира'],
  [RoominessValues.Two]: ['двухкомнатная квартира'],
  [RoominessValues.Three]: ['трехкомнатная квартира'],
  [RoominessValues.FourAndMore]: [
    'четырехкомнатная квартира',
    'пятикомнатная квартира',
    'шестикомнатная квартира',
    'семикомнатная квартира',
    'восьмикомнатная квартира',
    'девятикомнатная квартира',
    'десять и более комнат',
  ],
};

export const getRoominessByStrapiValue = (value: string) => {
  const [key] = Object.entries(roominessQueryMap).find(([, queryValue]) =>
    queryValue.includes(value),
  )!;

  return roominessFilterTagsMap[key as RoominessValues];
};

export enum HouseTypeValues {
  Panel = 'panel',
  Monolithic = 'monolithic',
  Brick = 'brick',
  BlockRooms = 'block-rooms',
  FrameBlock = 'frame-block',
  SilicateBlocks = 'silicate-blocks',
  Timbered = 'timbered',
}

export const houseTypeOptions: OptionType<HouseTypeValues> = [
  { value: HouseTypeValues.Panel, label: 'Панельный' },
  { value: HouseTypeValues.Monolithic, label: 'Монолитный' },
  { value: HouseTypeValues.Brick, label: 'Кирпичный' },
  { value: HouseTypeValues.BlockRooms, label: 'Блок-комнаты' },
  { value: HouseTypeValues.FrameBlock, label: 'Каркасно-блочный' },
  { value: HouseTypeValues.SilicateBlocks, label: 'Силикатные блоки' },
  { value: HouseTypeValues.Timbered, label: 'Бревенчатый' },
];

export const houseTypeQueryMap: QueryMapType<HouseTypeValues> = {
  [HouseTypeValues.Panel]: 'панельный',
  [HouseTypeValues.Monolithic]: 'монолитный',
  [HouseTypeValues.Brick]: 'кирпичный',
  [HouseTypeValues.BlockRooms]: 'блок-комнаты',
  [HouseTypeValues.FrameBlock]: 'каркасно-блочный',
  [HouseTypeValues.SilicateBlocks]: 'силикатные блоки',
  [HouseTypeValues.Timbered]: 'бревенчатый',
};

export enum BathroomValues {
  Separate = 'separate',
  Combined = 'combined',
  TwoAndMore = 'twoAndMore',
}

export const bathroomOptions: OptionType<BathroomValues> = [
  { value: BathroomValues.Separate, label: 'Раздельный' },
  { value: BathroomValues.Combined, label: 'Совмещенный' },
  { value: BathroomValues.TwoAndMore, label: '2 и более' },
];

export const bathroomFilterTagsMap: Record<BathroomValues, string> = bathroomOptions.reduce<
  Record<BathroomValues, string>
>((acc, cur) => {
  acc[cur.value as BathroomValues] = cur.label;
  return acc;
}, {} as Record<BathroomValues, string>);

export const bathroomQueryMap: QueryMapType<BathroomValues> = {
  [BathroomValues.Separate]: ['раздельный'],
  [BathroomValues.Combined]: ['совмещенный'],
  [BathroomValues.TwoAndMore]: ['два санузла', 'три санузла', 'четыре санузла'],
};

export enum BalconyValues {
  None = 'none',
  Balcony = 'balcony',
  Loggia = 'loggia',
}

export const balconyOptions: OptionType<BalconyValues> = [
  { value: BalconyValues.None, label: 'Нет' },
  { value: BalconyValues.Balcony, label: 'есть' },
  { value: BalconyValues.Loggia, label: 'Лоджия' },
];

export const balconyQueryMap: QueryMapType<BalconyValues> = {
  [BalconyValues.None]: 'нет',
  [BalconyValues.Balcony]: 'балкон',
  [BalconyValues.Loggia]: 'лоджия',
};

export enum SaleTermValues {
  Clear = 'clear',
  Change = 'change',
  ChangeMoveOut = 'changeMoveOut',
  ChangeMoveIn = 'changeMoveIn',
}

export const saleTermOptions: OptionType<SaleTermValues> = [
  { value: SaleTermValues.Clear, label: 'Чистая продажа' },
  { value: SaleTermValues.Change, label: 'Обмен' },
  { value: SaleTermValues.ChangeMoveOut, label: 'Обмен - разъезд' },
  { value: SaleTermValues.ChangeMoveIn, label: 'Обмен - съезд' },
];

export const saleTermQueryMap: QueryMapType<SaleTermValues> = {
  [SaleTermValues.Clear]: 'чистая продажа',
  [SaleTermValues.Change]: 'обмен',
  [SaleTermValues.ChangeMoveOut]: 'обмен - разъезд',
  [SaleTermValues.ChangeMoveIn]: 'обмен - съезд',
};

export enum FinishingValues {
  Good = 'good',
  Normal = 'normal',
  Bad = 'bad',
  Without = 'without',
  Construction = 'construction',
}

export const finishingOptions: OptionType<FinishingValues> = [
  { value: FinishingValues.Good, label: 'Хороший' },
  { value: FinishingValues.Normal, label: 'Нормальный' },
  { value: FinishingValues.Bad, label: 'Плохое состояние' },
  { value: FinishingValues.Without, label: 'Без отделки' },
  { value: FinishingValues.Construction, label: 'Строительная отделка' },
];

export const finishingFilterTagsMap: Record<FinishingValues, string> = finishingOptions.reduce<
  Record<FinishingValues, string>
>((acc, cur) => {
  acc[cur.value as FinishingValues] = cur.label;
  return acc;
}, {} as Record<FinishingValues, string>);

export const finishingQueryMap: QueryMapType<FinishingValues> = {
  [FinishingValues.Good]: ['евроремонт', 'отличный ремонт', 'хороший ремонт'],
  [FinishingValues.Normal]: ['нормальный ремонт', 'удовлетворительный ремонт'],
  [FinishingValues.Bad]: ['плохое состояние', 'аварийное состояние'],
  [FinishingValues.Without]: 'без отделки',
  [FinishingValues.Construction]: 'строительная отделка',
};

export const ceilingHeightValues = [
  {
    value: '2.5',
    label: 'От 2,5 м',
  },
  {
    value: '2.7',
    label: 'От 2,7 м',
  },
  {
    value: '3',
    label: 'От 3 м',
  },
  {
    value: '3.5',
    label: 'От 3,5 м',
  },
  {
    value: '4',
    label: 'От 4 м',
  },
];

export const flatCharacteristicsMap: Partial<
  Record<
    keyof DetailedFlatItem['parameters'],
    (value?: string | boolean) => { name: string; value: string; order: number }
  >
> = {
  roominess: (value) => ({ name: 'Комнатность', value: value as string, order: 1 }),
  separateRooms: (value) => ({ name: 'Раздельных комнат', value: value as string, order: 2 }),
  shareInApartment: (value) => ({ name: 'Доля в квартире', value: value as string, order: 2 }),
  snbArea: (value) => ({ name: 'Площадь по СНБ', value: `${value} м²`, order: 3 }),
  totalArea: (value) => ({ name: 'Площадь общая', value: `${value} м²`, order: 4 }),
  livingArea: (value) => ({ name: 'Площадь жилая', value: `${value} м²`, order: 5 }),
  kitchenArea: (value) => ({ name: 'Площадь кухни', value: `${value} м²`, order: 6 }),
  constructionYear: (value) => ({ name: 'Год постройки', value: value as string, order: 7 }),
  majorRenovationYear: (value) => ({
    name: 'Год капитального ремонта',
    value: value as string,
    order: 8,
  }),
  floorType: (value) => ({ name: 'Вид этажа', value: value as string, order: 10 }),
  levelNumber: (value) => ({ name: 'Число уровней', value: value as string, order: 11 }),
  houseType: (value) => ({ name: 'Тип дома', value: value as string, order: 12 }),
  layout: (value) => ({ name: 'Планировка', value: value as string, order: 13 }),
  balcony: (value) => ({ name: 'Балкон', value: value as string, order: 14 }),
  finishing: (value) => ({ name: 'Ремонт', value: value as string, order: 15 }),
  ceilingHeight: (value) => ({ name: 'Высота потолков', value: value as string, order: 16 }),
  flooring: (value) => ({ name: 'Полы', value: value as string, order: 17 }),
  bathroom: (value) => ({ name: 'Санузел', value: value as string, order: 18 }),
  telephone: (value) => ({ name: 'Телефон', value: value as string, order: 19 }),
  parking: (value) => ({ name: 'Парковочное место', value: value ? 'есть' : 'нет', order: 20 }),
  lastFloor: (value) => ({ name: 'Последний этаж', value: value ? 'да' : 'нет', order: 21 }),
  balconyArea: (value) => ({
    name: 'Площадь балконов (лоджий, террас)',
    value: `${value} м²`,
    order: 22,
  }),
  furniture: (value) => ({ name: 'Мебель', value: value ? 'есть' : 'нет', order: 23 }),
  bargain: (value) => ({ name: 'Возможен торг', value: value ? 'да' : 'нет', order: 24 }),
  propertyType: (value) => ({ name: 'Собственность', value: value as string, order: 25 }),
  saleTerms: (value) => ({ name: 'Условия сделки', value: value as string, order: 26 }),
  contractNumber: (value) => ({
    name: 'Номер договора',
    value: value as string,
    order: 27,
  }),
};
