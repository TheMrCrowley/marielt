import { OptionType, QueryMapType } from '@/src/types/Filters';
import { DetailedHousesAndLotsItem } from '@/src/types/HousesAndLots';

export enum HousesAndLotsRootCategory {
  Dachi = 'dachi',
  Cottages = 'cottages',
  Plots = 'plots',
}

export enum ElectricityValues {
  Yes = 'yes',
  No = 'no',
  V220 = 'V220',
  V320 = 'V320',
}

export const electricityOptions: OptionType<ElectricityValues> = [
  { label: 'Есть', value: ElectricityValues.Yes },
  { label: 'Нет', value: ElectricityValues.No },
  { label: 'В220', value: ElectricityValues.V220 },
  { label: 'В380', value: ElectricityValues.V320 },
];

export const electricityFilterTagsMap: Record<ElectricityValues, string> =
  electricityOptions.reduce<Record<ElectricityValues, string>>((acc, cur) => {
    acc[cur.value as ElectricityValues] = cur.label;
    return acc;
  }, {} as Record<ElectricityValues, string>);

export const electricityQueryMap: QueryMapType<ElectricityValues> = {
  [ElectricityValues.Yes]: ['есть', 'рядом'],
  [ElectricityValues.No]: 'нет',
  [ElectricityValues.V220]: 'В220',
  [ElectricityValues.V320]: 'В380',
};

export enum GasSupplyValues {
  Yes = 'yes',
  Near = 'near',
  No = 'no',
}

export const gasSupplyOptions: OptionType<GasSupplyValues> = [
  {
    label: 'Есть',
    value: GasSupplyValues.Yes,
  },
  {
    label: 'Рядом',
    value: GasSupplyValues.Near,
  },
  {
    label: 'Нет',
    value: GasSupplyValues.No,
  },
];

export const gasSupplyQueryMap: QueryMapType<GasSupplyValues> = {
  [GasSupplyValues.Yes]: 'есть',
  [GasSupplyValues.No]: 'нет',
  [GasSupplyValues.Near]: 'рядом',
};

export enum HeatingValues {
  Steam = 'steam',
  GasHeating = 'gas heating',
  Central = 'central',
  Oven = 'oven',
  Electric = 'electric',
  AlternativeSources = 'alternative sources',
  No = 'no',
}

export const heatingOptions: OptionType<HeatingValues> = [
  { value: HeatingValues.Steam, label: 'Паровое' },
  { value: HeatingValues.GasHeating, label: 'На газу' },
  { value: HeatingValues.Oven, label: 'Печное' },
  { value: HeatingValues.Electric, label: 'Электрическое' },
  { value: HeatingValues.Central, label: 'Центральное' },
  { value: HeatingValues.No, label: 'Нет' },
  { value: HeatingValues.AlternativeSources, label: 'Альтернативные источники' },
];

export const heatingFilterTagsMap: Record<HeatingValues, string> = heatingOptions.reduce<
  Record<HeatingValues, string>
>((acc, cur) => {
  acc[cur.value as HeatingValues] = cur.label;
  return acc;
}, {} as Record<HeatingValues, string>);

export const heatingQueryMap: QueryMapType<HeatingValues> = {
  [HeatingValues.Steam]: [
    'паровое',
    'паровое на газу',
    'паровое на жидком топливе',
    'паровое на твердом топливе',
  ],
  [HeatingValues.GasHeating]: 'отопление на газу',
  [HeatingValues.Central]: 'центральное',
  [HeatingValues.Oven]: 'печное',

  [HeatingValues.Electric]: 'электрическое',
  [HeatingValues.AlternativeSources]: 'альтернативные источники',
  [HeatingValues.No]: 'нет',
};

export enum HouseLevelValues {
  One = 'one',
  Two = 'two',
  TheeOrMore = 'threeOrMore',
}

export const houseLevelsOptions: OptionType<HouseLevelValues> = [
  { value: HouseLevelValues.One, label: '1' },
  { value: HouseLevelValues.Two, label: '2' },
  { value: HouseLevelValues.TheeOrMore, label: '3+' },
];

export const houseLevelQueryMap: QueryMapType<HouseLevelValues> = {
  [HouseLevelValues.One]: 'один',
  [HouseLevelValues.Two]: 'два',
  [HouseLevelValues.TheeOrMore]: 'три и более',
};

export enum WaterValues {
  Hot = 'hot',
  Cold = 'cold',
  Well = 'well',
  WaterSupplyNearby = 'water-supply-nearby',
  CentralWaterSupply = 'central-water-supply',
  Hole = 'hole',
  Seasonal = 'seasonal',
  No = 'no',
}

export enum LotsWaterValues {
  Yes = 'yes',
  No = 'no',
}

export const waterOptions: OptionType<WaterValues> = [
  { label: 'Горячая', value: WaterValues.Hot },
  { label: 'Холодная', value: WaterValues.Cold },
  { label: 'Колодец', value: WaterValues.Well },
  { label: 'Водопровод', value: WaterValues.WaterSupplyNearby },
  { label: 'Центральный водопровод', value: WaterValues.CentralWaterSupply },
  { label: 'Нет', value: WaterValues.No },
  { label: 'Скважина', value: WaterValues.Hole },
  { label: 'Сезонная', value: WaterValues.Seasonal },
];

export const waterTagsMap: Record<WaterValues, string> = waterOptions.reduce<
  Record<WaterValues, string>
>((acc, cur) => {
  acc[cur.value as WaterValues] = cur.label;
  return acc;
}, {} as Record<WaterValues, string>);

export const lotsWaterOptions: OptionType<LotsWaterValues> = [
  { label: 'Есть', value: LotsWaterValues.Yes },
  { label: 'Нету', value: LotsWaterValues.No },
];

export const lotsWaterTagsMap: Record<LotsWaterValues, string> = lotsWaterOptions.reduce<
  Record<LotsWaterValues, string>
>((acc, cur) => {
  acc[cur.value as LotsWaterValues] = cur.label;
  return acc;
}, {} as Record<LotsWaterValues, string>);

export const waterQueryMap: QueryMapType<WaterValues> = {
  [WaterValues.Hot]: 'горячая',
  [WaterValues.Cold]: ['холодная', 'рядом'],
  [WaterValues.Well]: ['колодец', 'рядом колодец'],
  [WaterValues.WaterSupplyNearby]: 'рядом водопровод',
  [WaterValues.CentralWaterSupply]: 'центральный водопровод',
  [WaterValues.Hole]: 'скважина',
  [WaterValues.No]: 'нет',
  [WaterValues.Seasonal]: 'сезонная',
};

export const lotsWaterQueryMap: QueryMapType<LotsWaterValues> = {
  [LotsWaterValues.Yes]: [
    'горячая',
    'холодная',
    'рядом',
    'колодец',
    'рядом колодец',
    'рядом водопровод',
    'центральный водопровод',
    'скважина',
    'сезонная',
  ],
  [LotsWaterValues.No]: 'нет',
};

export enum WallMaterialValues {
  Brick = 'brick',
  Panel = 'panel',
  BlockRooms = 'block-rooms',
  Log = 'log',
  MonolithicFrame = 'monolithic-frame',
  SilicateBlock = 'silicate-block',
}

export const wallMaterialOptions: OptionType<WallMaterialValues> = [
  { label: 'Кирпич', value: WallMaterialValues.Brick },
  { label: 'Панельный', value: WallMaterialValues.Panel },
  { label: 'Блок-комнаты', value: WallMaterialValues.BlockRooms },
  { label: 'Бревенчатый', value: WallMaterialValues.Log },
  { label: 'Монолитно-каркасный', value: WallMaterialValues.MonolithicFrame },
  { label: 'Силикатные блоки', value: WallMaterialValues.SilicateBlock },
];

export const wallMaterialTagsMap: Record<WallMaterialValues, string> = wallMaterialOptions.reduce<
  Record<WallMaterialValues, string>
>((acc, cur) => {
  acc[cur.value as WallMaterialValues] = cur.label;
  return acc;
}, {} as Record<WallMaterialValues, string>);

export const wallMaterialQueryMap: QueryMapType<WallMaterialValues> = {
  [WallMaterialValues.Brick]: ['кирпич', 'облицовочный кирпич', 'красный кирпич', 'белый кирпич'],
  [WallMaterialValues.Panel]: ['панельный'],
  [WallMaterialValues.BlockRooms]: ['блочный'],
  [WallMaterialValues.Log]: [
    'каркасно-засыпной',
    'сборно-щитовой',
    'брус профилированный',
    'каркасный деревянный',
    'сруб',
    'брус оцилиндрованный',
    'брус клееный',
    'дерево',
    'дерево, обложено кирпичом',
  ],
  [WallMaterialValues.MonolithicFrame]: ['монолитно-каркасный'],
  [WallMaterialValues.SilicateBlock]: ['керамзитбетон', 'блок газосиликатный', 'шлакобетон'],
};

export enum SewerageValues {
  Yes = 'yes',
  No = 'no',
  Street = 'street',
}

export const sewerageOptions: OptionType<SewerageValues> = [
  { label: 'Есть', value: SewerageValues.Yes },
  { label: 'Нет', value: SewerageValues.No },
  { label: 'С/у на улице', value: SewerageValues.Street },
];

export const sewerageTagsMap: Record<SewerageValues, string> = sewerageOptions.reduce<
  Record<SewerageValues, string>
>((acc, cur) => {
  acc[cur.value as SewerageValues] = cur.label;
  return acc;
}, {} as Record<SewerageValues, string>);

export const sewerageQueryMap: QueryMapType<SewerageValues> = {
  [SewerageValues.Yes]: ['есть', 'центральная', 'местная'],
  [SewerageValues.No]: 'нет',
  [SewerageValues.Street]: 'с/у на улице',
};

export const houseCharacteristicsMap: Partial<
  Record<
    keyof DetailedHousesAndLotsItem['parameters'],
    (value?: string | boolean) => { name: string; value: string; order: number }
  >
> = {
  plotSize: (value) => ({ name: 'Площадь участка', value: `${value} сот.`, order: 1 }),
  builtUpAreaWidth: (value) => ({ name: 'Ширина застройки', value: `${value} м`, order: 2 }),
  builtUpAreaLength: (value) => ({ name: 'Длина застройки', value: `${value} м`, order: 3 }),
  totalArea: (value) => ({ name: 'Площадь общая', value: `${value} м²`, order: 4 }),
  livingArea: (value) => ({ name: 'Площадь жилая', value: `${value} м²`, order: 5 }),
  kitchenArea: (value) => ({ name: 'Площадь кухни', value: `${value} м²`, order: 6 }),
  levelNumber: (value) => ({ name: 'Количество уровней', value: value as string, order: 7 }),
  constructionYear: (value) => ({ name: 'Год постройки', value: value as string, order: 8 }),
  readinessPercentage: (value) => ({ name: 'Процент готовности', value: `${value}%`, order: 9 }),
  wallMaterial: (value) => ({ name: 'Материал стен', value: value as string, order: 10 }),
  roofMaterial: (value) => ({ name: 'Материал крыши', value: value as string, order: 11 }),
  heating: (value) => ({ name: 'Отопление', value: value as string, order: 12 }),
  gas: (value) => ({ name: 'Газ', value: value as string, order: 13 }),
  water: (value) => ({ name: 'Вода', value: value as string, order: 14 }),
  sewerage: (value) => ({ name: 'Канализация', value: value as string, order: 15 }),
  electricity: (value) => ({ name: 'Электроснабжение', value: value as string, order: 16 }),
  telephone: (value) => ({ name: 'Телефон', value: value as string, order: 17 }),
  parking: (value) => ({ name: 'Парковочное место', value: value as string, order: 18 }),
  balcony: (value) => ({ name: 'Балкон', value: value as string, order: 19 }),
  roomsNumber: (value) => ({ name: 'Количество комнат', value: value as string, order: 20 }),
  wallMaterialAdd: (value) => ({ name: 'Материал стен (доп.)', value: value as string, order: 21 }),
  waterAdd: (value) => ({ name: 'Вода (доп.)', value: value as string, order: 22 }),
  sewerageAdd: (value) => ({ name: 'Канализация (доп.)', value: value as string, order: 23 }),
  propertyType: (value) => ({ name: 'Статус земли', value: value as string, order: 24 }),
  bargain: (value) => ({ name: 'Возможен торг', value: value ? 'да' : 'нет', order: 25 }),
  saleTerms: (value) => ({ name: 'Условия сделки', value: value as string, order: 26 }),
  contractNumber: (value) => ({
    name: 'Номер договора',
    value: value as string,
    order: 27,
  }),
};
