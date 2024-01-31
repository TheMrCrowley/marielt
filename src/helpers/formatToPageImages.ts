import { ImageType, ImageTypeWithThumb } from '@/src/types/ImageType';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';
import { StrapiImage } from '@/src/types/StrapiTypes';

export const formatToItemImage = (
  data?: StrapiFindResponse<StrapiImage>['data'],
): ImageType | undefined => {
  if (!data || !Array.isArray(data)) {
    return;
  }

  return {
    height: data[0].attributes.height,
    width: data[0].attributes.width,
    url: `https://marielt.by:6060${data[0].attributes.url}`,
    placeholder: data[0].attributes.placeholder,
  };
};

export const formatToPageImages = (
  data?: StrapiFindResponse<StrapiImage>['data'],
): Array<ImageTypeWithThumb> => {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data
    .filter((item) => !item.attributes.url.includes('.html'))
    .map((item) => ({
      url: `https://marielt.by:6060${item.attributes.url}`,
      height: item.attributes.height,
      width: item.attributes.width,
      placeholder: item.attributes.placeholder,
      thumb: {
        url: `https://marielt.by:6060${item.attributes.formats.thumbnail.url}`,
        height: item.attributes.formats.thumbnail.height,
        width: item.attributes.formats.thumbnail.width,
        placeholderUrl: item.attributes.placeholder,
      },
    }));
};
