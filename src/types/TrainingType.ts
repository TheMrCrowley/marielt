export type Training = {
  id: string;
  title: string;
  description?: string;
  content?: string;
  image?: {
    width: number;
    height: number;
    placeholder: string;
    url: string;
  };
};
