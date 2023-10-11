export const getFullAddress = ({
  locality,
  houseNumber,
  street,
}: {
  locality: string;
  street?: string;
  houseNumber?: number;
}): string => {
  return [locality, street, houseNumber].filter(Boolean).join(', ');
};
