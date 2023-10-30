export interface StrapiFindResponse<T> {
  data: Array<{
    id: string;
    attributes: T;
  }>;
  meta: { pagination: { page: number; pageSize: number; pageCount: number; total: number } };
}

export interface StrapiFindOneResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
}
