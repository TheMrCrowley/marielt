export const phoneNumberMask = (phone: string) => {
  const formatted = phone.replace(/\W/gim, '');

  const mainCode = formatted.substring(0, 3);
  const subCode = formatted.substring(3, 5);
  const first = formatted.substring(5, 8);
  const second = formatted.substring(8, 10);
  const third = formatted.substring(10, 12);

  return `+${mainCode} (${subCode}) ${first}-${second}-${third}`;
};
