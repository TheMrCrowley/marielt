export enum SortLabels {
  PriceDesc = 'Сначала дорогие',
  PriceAsc = 'Сначала дешевые',
  DateAsc = 'Сначала новые',
}

export enum SortValues {
  PriceDesc = 'price:desc',
  PriceAsc = 'price:asc',
  DateAsc = 'createdAt:desc',
}

export const sortOptions = [
  {
    label: SortLabels.DateAsc,
    value: SortLabels.DateAsc,
  },
  {
    label: SortLabels.PriceAsc,
    value: SortLabels.PriceAsc,
  },
  {
    label: SortLabels.PriceDesc,
    value: SortLabels.PriceDesc,
  },
];

export const sortQueryMap = {
  [SortLabels.DateAsc]: SortValues.DateAsc,
  [SortLabels.PriceAsc]: SortValues.PriceAsc,
  [SortLabels.PriceDesc]: SortValues.PriceDesc,
};

export const sortLabelMap = {
  [SortValues.DateAsc]: SortLabels.DateAsc,
  [SortValues.PriceAsc]: SortLabels.PriceAsc,
  [SortValues.PriceDesc]: SortLabels.PriceDesc,
};
