export interface StrapiFindResponse<T> {
  data: Array<{
    id: number;
    attributes: T;
  }>;
}

export interface StrapiFindOneResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
}
