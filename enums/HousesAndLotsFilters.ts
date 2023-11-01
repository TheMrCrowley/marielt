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
