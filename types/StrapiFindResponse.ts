export interface StrapiFindResponse<T> {
  data: Array<{
    id: string;
    attributes: T;
  }>;
}

export interface StrapiFindOneResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
}
