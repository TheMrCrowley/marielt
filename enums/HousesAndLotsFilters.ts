import { OptionType, QueryMapType } from '@/types/Filters';

export enum HousesAndLotsType {
  Dachi = 'dachi',
  Cottages = 'cottages',
  Plots = 'plots',
}

export const housesAndLotsTypeMap: Record<HousesAndLotsType, string> = {
  [HousesAndLotsType.Dachi]: 'Дачи',
  [HousesAndLotsType.Cottages]: 'Дома и коттеджи',
  [HousesAndLotsType.Plots]: 'Земельные участки',
};

export const getRouteByHouseType = (type: string): HousesAndLotsType => {
  if (!type) {
    return HousesAndLotsType.Cottages;
  }
  return Object.entries(housesAndLotsTypeMap).filter(
    ([, value]) => type === value,
  )[0][0] as HousesAndLotsType;
};

enum ElectricityValues {
  Yes = 'yes',
  Near = 'near',
  No = 'no',
  V220 = 'V220',
  V320 = 'V320',
}

export const electricityOptions: OptionType<ElectricityValues> = [
  { label: 'Есть', value: ElectricityValues.Yes },
  { label: 'Рядом', value: ElectricityValues.Near },
  { label: 'Нет', value: ElectricityValues.No },
  { label: 'В220', value: ElectricityValues.V220 },
  { label: 'В380', value: ElectricityValues.V320 },
];

export const electricityQueryMap: QueryMapType<ElectricityValues> = {
  [ElectricityValues.Yes]: 'есть',
  [ElectricityValues.Near]: 'рядом',
  [ElectricityValues.No]: 'нет',
  [ElectricityValues.V220]: 'В220',
  [ElectricityValues.V320]: 'В380',
};

enum GasSupplyValues {
  Yes = 'yes',
  No = 'no',
}

export const gasSupplyOptions: OptionType<GasSupplyValues> = [
  {
    label: 'Есть',
    value: GasSupplyValues.Yes,
  },
  {
    label: 'No',
    value: GasSupplyValues.No,
  },
];

export const gasSupplyQueryMap: QueryMapType<GasSupplyValues> = {
  [ElectricityValues.Yes]: 'есть',
  [ElectricityValues.No]: 'нет',
};

enum HeatingValues {
  Steam = 'steam',
  GasHeating = 'gas heating',
  Central = 'central',
  Oven = 'oven',
  SteamOnGas = 'steam on gas',
  LiquidFuelSteam = 'liquid fuel steam',
  SolidFuelSteam = 'solid fuel steam',
  Electric = 'electric',
  AlternativeSources = 'alternative sources',
  No = 'no',
}

export const heatingOptions: OptionType<HeatingValues> = [
  { value: HeatingValues.Steam, label: 'Паровое' },
  { value: HeatingValues.GasHeating, label: 'Отопление на газу' },
  { value: HeatingValues.Central, label: 'Центральное' },
  { value: HeatingValues.Oven, label: 'Печное' },
  { value: HeatingValues.SteamOnGas, label: 'Паровое на газу' },
  { value: HeatingValues.LiquidFuelSteam, label: 'Паровое на жидком топливе' },
  { value: HeatingValues.SolidFuelSteam, label: 'Паровое на твердом топливе' },
  { value: HeatingValues.Electric, label: 'Электрическое' },
  { value: HeatingValues.AlternativeSources, label: 'Альтернативные источники' },
  { value: HeatingValues.No, label: 'Нет' },
];

export const heatingQueryMap: QueryMapType<HeatingValues> = {
  [HeatingValues.Steam]: 'паровое',
  [HeatingValues.GasHeating]: 'отопление на газу',
  [HeatingValues.Central]: 'центральное',
  [HeatingValues.Oven]: 'печное',
  [HeatingValues.SteamOnGas]: 'паровое на газу',
  [HeatingValues.LiquidFuelSteam]: 'паровое на жидком топливе',
  [HeatingValues.SolidFuelSteam]: 'паровое на твердом топливе',
  [HeatingValues.Electric]: 'электрическое',
  [HeatingValues.AlternativeSources]: 'альтернативные источники',
  [HeatingValues.No]: 'нет',
};

enum HouseLevelValues {
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

enum WaterValues {
  Hot = 'hot',
  Cold = 'cold',
  Near = 'near',
  WellNearby = 'well nearby',
  WaterSupplyNearby = 'water supply nearby',
  CentralWaterSupply = 'central water supply',
  Hole = 'hole',
  Well = 'well',
  No = 'no',
  Seasonal = 'seasonal',
}

export const waterOptions: OptionType<WaterValues> = [
  { label: 'Горячая', value: WaterValues.Hot },
  { label: 'Холодная', value: WaterValues.Cold },
  { label: 'Рядом', value: WaterValues.Near },
  { label: 'Рядом колодец', value: WaterValues.WellNearby },
  { label: 'Рядом водопровод', value: WaterValues.WaterSupplyNearby },
  { label: 'Центральный водопровод', value: WaterValues.CentralWaterSupply },
  { label: 'Скважина', value: WaterValues.Hole },
  { label: 'Колодец', value: WaterValues.Well },
  { label: 'Нет', value: WaterValues.No },
  { label: 'Сезонная', value: WaterValues.Seasonal },
];

export const waterQueryMap: QueryMapType<WaterValues> = {
  [WaterValues.Hot]: 'горячая',
  [WaterValues.Cold]: 'холодная',
  [WaterValues.Near]: 'рядом',
  [WaterValues.WellNearby]: 'рядом колодец',
  [WaterValues.WaterSupplyNearby]: 'рядом водопровод',
  [WaterValues.CentralWaterSupply]: 'центральный водопровод',
  [WaterValues.Hole]: 'скважина',
  [WaterValues.Well]: 'колодец',
  [WaterValues.No]: 'нет',
  [WaterValues.Seasonal]: 'сезонная',
};

enum WallMaterialValues {
  Brick = 'brick',
  FacingBrick = 'facing-brick',
  Panel = 'panel',
  Block = 'block',
  Tree = 'tree',
  WoodLinedWithBrick = 'wood-lined-with-brick',
  RedBrick = 'red-brick',
  WhiteBrick = 'white-brick',
  GasSilicateBlock = 'gas-silicate-block',
  ExpandedClayConcrete = 'expanded-clay-concrete',
  CinderConcrete = 'cinder-concrete',
  LogHouse = 'log-house',
  ProfiledTimber = 'profiled-timber',
  RoundedTimber = 'rounded-timber',
  LaminatedTimber = 'laminated-timber',
  FrameFill = 'frame-fill',
  PrefabricatedPanel = 'prefabricated-panel',
  FrameWooden = 'frame-wooden',
  MonolithicFrame = 'monolithic-frame',
}

export const wallMaterialOptions: OptionType<WallMaterialValues> = [
  { label: 'Кирпич', value: WallMaterialValues.Brick },
  { label: 'Облицовочный кирпич', value: WallMaterialValues.FacingBrick },
  { label: 'Панельный', value: WallMaterialValues.Panel },
  { label: 'Блочный', value: WallMaterialValues.Block },
  { label: 'Дерево', value: WallMaterialValues.Tree },
  { label: 'Дерево, обложено кирпичом', value: WallMaterialValues.WoodLinedWithBrick },
  { label: 'Красный кирпич', value: WallMaterialValues.RedBrick },
  { label: 'Белый кирпич', value: WallMaterialValues.WhiteBrick },
  { label: 'Блок газосиликатный', value: WallMaterialValues.GasSilicateBlock },
  { label: 'Керамзитбетон', value: WallMaterialValues.ExpandedClayConcrete },
  { label: 'Щлакобетон', value: WallMaterialValues.CinderConcrete },
  { label: 'Сруб', value: WallMaterialValues.LogHouse },
  { label: 'Брус профилированный', value: WallMaterialValues.ProfiledTimber },
  { label: 'Брус оцилиндрованный', value: WallMaterialValues.RoundedTimber },
  { label: 'Брус клееный', value: WallMaterialValues.LaminatedTimber },
  { label: 'Каркасно-засыпной', value: WallMaterialValues.FrameFill },
  { label: 'Сборно-щитовой', value: WallMaterialValues.PrefabricatedPanel },
  { label: 'Каркасный деревянный', value: WallMaterialValues.FrameWooden },
  { label: 'Монолитно-каркасный', value: WallMaterialValues.MonolithicFrame },
];

export const wallMaterialQueryMap: QueryMapType<WallMaterialValues> = {
  [WallMaterialValues.Brick]: 'кирпич',
  [WallMaterialValues.FacingBrick]: 'облицовочный кирпич',
  [WallMaterialValues.Panel]: 'панельный',
  [WallMaterialValues.Block]: 'блочный',
  [WallMaterialValues.Tree]: 'дерево',
  [WallMaterialValues.WoodLinedWithBrick]: 'дерево, обложено кирпичом',
  [WallMaterialValues.RedBrick]: 'красный кирпич',
  [WallMaterialValues.WhiteBrick]: 'белый кирпич',
  [WallMaterialValues.GasSilicateBlock]: 'блок газосиликатный',
  [WallMaterialValues.ExpandedClayConcrete]: 'керамзитбетон',
  [WallMaterialValues.CinderConcrete]: 'шлакобетон',
  [WallMaterialValues.LogHouse]: 'сруб',
  [WallMaterialValues.ProfiledTimber]: 'брус профилированный',
  [WallMaterialValues.RoundedTimber]: 'брус оцилиндрованный',
  [WallMaterialValues.LaminatedTimber]: 'брус клееный',
  [WallMaterialValues.FrameFill]: 'каркасно-засыпной',
  [WallMaterialValues.PrefabricatedPanel]: 'сборно-щитовой',
  [WallMaterialValues.FrameWooden]: 'каркасный деревянный',
  [WallMaterialValues.MonolithicFrame]: 'монолитно-каркасный',
};

enum SewerageValues {
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
  [SewerageValues.Yes]: 'есть',
  [SewerageValues.No]: 'нет',
  [SewerageValues.Street]: 'с/у на улице',
};
