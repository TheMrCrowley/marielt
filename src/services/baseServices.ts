const BASE_REVALIDATE_TIME = 60;

export const fetchWrapper = async <T>(url: string, options?: RequestInit): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...options,
      next: {
        revalidate: BASE_REVALIDATE_TIME,
      },
    });

    const data = (await response.json()) as T;

    return data;
  } catch (e) {
    console.error(`Failed to fetch url: ${url}`, (e as Error).message);
    throw e;
  }
};
