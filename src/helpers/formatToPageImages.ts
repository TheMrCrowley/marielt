import { StrapiFindResponse } from '@/src/types/StrapiTypes';
import { StrapiImage } from '@/src/types/StrapiTypes';

export const formatToPageImages = (
  data?: StrapiFindResponse<StrapiImage>['data'],
): Array<{
  url: string;
  width: number;
  height: number;
  placeholderUrl: string;
  thumb: { url: string; width: number; height: number; placeholderUrl: string };
}> => {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data
    .filter((item) => !item.attributes.url.includes('.html'))
    .map((item) => ({
      url: item.attributes.url,
      height: item.attributes.height,
      width: item.attributes.width,
      placeholderUrl: item.attributes.placeholder,
      thumb: {
        url: item.attributes.formats.thumbnail.url,
        height: item.attributes.formats.thumbnail.height,
        width: item.attributes.formats.thumbnail.width,
        placeholderUrl: item.attributes.placeholder,
      },
    }));
};
