export const isClientMobile = () => {
  const regex = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/i;

  return regex.test(navigator.userAgent);
};
