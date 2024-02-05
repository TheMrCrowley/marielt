import { ImageType, ImageTypeWithThumb } from '@/src/types/ImageType';
import { StrapiFindResponse } from '@/src/types/StrapiTypes';
import { StrapiImage } from '@/src/types/StrapiTypes';

export const formatToItemImage = (
  data?: StrapiFindResponse<StrapiImage>['data'],
): ImageType | undefined => {
  if (!data || !Array.isArray(data)) {
    return;
  }

  if (!data[0].attributes.formats) {
    throw new Error(JSON.stringify(data[0], null, 2));
  }

  const imageSize = data[0].attributes.formats.medium?.url
    ? 'medium'
    : data[0].attributes.formats.small?.url
    ? 'small'
    : '';

  const url = imageSize ? data[0].attributes.formats[imageSize].url : data[0].attributes.url;
  const width = imageSize ? data[0].attributes.formats[imageSize].width : data[0].attributes.width;
  const height = imageSize
    ? data[0].attributes.formats[imageSize].height
    : data[0].attributes.height;

  return {
    height,
    width,
    url: `https://marielt.by:6060${url}`,
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
    .map((item) => {
      const imageSize = item.attributes.formats.medium?.url
        ? 'medium'
        : item.attributes.formats.small?.url
        ? 'small'
        : '';

      const url = imageSize ? item.attributes.formats[imageSize].url : item.attributes.url;
      const width = imageSize ? item.attributes.formats[imageSize].width : item.attributes.width;
      const height = imageSize ? item.attributes.formats[imageSize].height : item.attributes.height;

      return {
        url: `https://marielt.by:6060${url}`,
        height,
        width,
        placeholder: item.attributes.placeholder,
        thumb: {
          url: `https://marielt.by:6060${item.attributes.formats.thumbnail.url}`,
          height: item.attributes.formats.thumbnail.height,
          width: item.attributes.formats.thumbnail.width,
          placeholderUrl: item.attributes.placeholder,
        },
      };
    });
};
