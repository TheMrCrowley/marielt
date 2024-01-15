export const getSmallAddress = ({
  locality,
  houseNumber,
  street,
}: {
  locality: string;
  street?: string;
  houseNumber?: string;
}): string => {
  return [locality, street, houseNumber].filter((item) => !!item).join(', ');
};

export const getFullAddress = ({
  district,
  districtRb,
  houseNumber,
  locality,
  microDistrict,
  region,
  street,
  village,
}: {
  region?: string;
  districtRb?: string;
  village?: string;
  locality?: string;
  district?: string;
  microDistrict?: string;
  street?: string;
  houseNumber?: string;
}) => {
  if (locality?.toLowerCase() === 'минск') {
    return Array.from(
      new Set([locality, district, microDistrict, street, houseNumber].filter(Boolean)),
    ).join(', ');
  }
  return Array.from(
    new Set(
      [region, districtRb, village, locality, district, microDistrict, street, houseNumber].filter(
        Boolean,
      ),
    ),
  ).join(', ');
};
