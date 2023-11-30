export interface StrapiVideo {
  url: string;
  title: string;
  thumbnail: string;
  mime: string;
  rawData: {
    title: string;
    author_name: string;
    author_url: string;
    type: string;
    height: number;
    width: number;
    version: string;
    provider_name: string;
    provider_url: string;
    thumbnail_height: number;
    thumbnail_width: number;
    thumbnail_url: string;
    html: string;
  };
}
