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
  building,
}: {
  region?: string;
  districtRb?: string;
  village?: string;
  locality?: string;
  district?: string;
  microDistrict?: string;
  street?: string;
  houseNumber?: string;
  building?: string;
}) => {
  if (locality?.toLowerCase() === 'минск') {
    const result = Array.from(
      new Set([locality, district, microDistrict, street, houseNumber].filter(Boolean)),
    ).join(', ');
    return building ? result + '/' + building : result;
  }

  const result = Array.from(
    new Set(
      [
        region,
        districtRb,
        village,
        locality,
        district,
        microDistrict,
        street,
        houseNumber,
        building,
      ].filter(Boolean),
    ),
  ).join(', ');

  return building ? result + '/' + building : result;
};
