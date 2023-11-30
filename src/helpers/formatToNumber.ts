export const formatToNumber = (value: string, maxLength?: number) =>
  maxLength ? value.substring(0, maxLength).replace(/[\D\s]/gim, '') : value.replace(/\D/gim, '');
