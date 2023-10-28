export const getFullAddress = ({
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
