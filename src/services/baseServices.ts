const BASE_REVALIDATE_TIME = 60;

export const fetchWrapper = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, {
    ...options,
    next: {
      revalidate: BASE_REVALIDATE_TIME,
    },
  });

  const data = (await response.json()) as T;

  return data;
};
