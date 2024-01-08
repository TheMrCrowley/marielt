export type ImageType = {
  url: string;
  width: number;
  height: number;
  placeholder: string;
};

export type ImageTypeWithThumb = {
  thumb: { url: string; width: number; height: number; placeholderUrl: string };
} & ImageType;
