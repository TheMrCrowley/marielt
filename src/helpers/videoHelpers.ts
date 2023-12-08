export const getVideoId = (url: string) => {
  return url.split('=')[1];
};
