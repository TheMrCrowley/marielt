import { OptionType, QueryMapType } from '@/src/types/Filters';

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

export const sewerageQueryMap: QueryMapType<SewerageValues> = {
  [SewerageValues.Yes]: ['есть', 'центральная', 'местная'],
  [SewerageValues.No]: 'нет',
  [SewerageValues.Street]: 'с/у на улице',
};
