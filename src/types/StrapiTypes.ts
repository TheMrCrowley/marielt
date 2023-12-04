import { AppRoutes } from '@/src/enums/AppRoutes';

export interface StrapiFindResponse<T> {
  data: Array<{
    id: string;
    attributes: T;
  }>;
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

export interface StrapiFindOneResponse<T> {
  data: {
    id: string;
    attributes: T;
  };
}

export interface HomePageItemResponse {
  text_1: string;
  text_2: string;
  background: boolean;
  banner: StrapiFindOneResponse<{
    width: number;
    height: number;
    url: string;
    placeholder: string;
  }>;
  section: Array<{
    title: string;
    description: string;
    variant: 'primary' | 'secondary';
    to: AppRoutes;
    navigation_title: string;
    type: 'product' | 'opportunity';
    image: StrapiFindOneResponse<{
      width: number;
      height: number;
      url: string;
      placeholder: string;
    }>;
  }>;
}

export interface StrapiImage {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  placeholder: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: ProviderMetadata;
  createdAt: string;
  updatedAt: string;
}

interface Formats {
  small: Format;
  medium: Format;
  thumbnail: Format;
}

interface Format {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  provider_metadata: ProviderMetadata;
}

interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

export interface CreditStrapiResponse {
  interest_rate: number;
}
