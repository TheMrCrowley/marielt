type OptionType<T extends string> = Array<{
  label: string;
  value: T;
}>;

type QueryMapType<T extends string> = Record<T, string | string[]>;

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

enum BathroomValues {
  Separate = 'separate',
  Combined = 'combined',
  TwoAndMore = 'twoAndMore',
}

export const bathroomOptions: OptionType<BathroomValues> = [
  { value: BathroomValues.Separate, label: 'Раздельный' },
  { value: BathroomValues.Combined, label: 'Совмещенный' },
  { value: BathroomValues.TwoAndMore, label: '2 и более' },
];

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
  { value: BalconyValues.Balcony, label: 'Есть' },
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
