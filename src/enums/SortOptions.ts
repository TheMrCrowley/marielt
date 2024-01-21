export enum SortLabels {
  PriceDesc = 'Сначала дорогие',
  PriceAsc = 'Сначала дешевые',
  DateDesc = 'Сначала новые',
}

export enum SortValues {
  PriceDesc = 'price:desc',
  PriceAsc = 'price:asc',
  DateDesc = 'createdAt:desc',
}

export const sortOptions = [
  {
    label: SortLabels.DateDesc,
    value: SortLabels.DateDesc,
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
  [SortLabels.DateDesc]: SortValues.DateDesc,
  [SortLabels.PriceAsc]: SortValues.PriceAsc,
  [SortLabels.PriceDesc]: SortValues.PriceDesc,
};

export const sortLabelMap = {
  [SortValues.DateDesc]: SortLabels.DateDesc,
  [SortValues.PriceAsc]: SortLabels.PriceAsc,
  [SortValues.PriceDesc]: SortLabels.PriceDesc,
};
