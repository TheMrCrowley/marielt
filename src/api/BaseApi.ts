const BASE_REVALIDATE_TIME = 60;

export default class BaseApi {
  public constructor(private readonly baseApiURL: string, private readonly apiName: string) {}

  protected async fetchWrapper<T>(url: string, options?: RequestInit): Promise<T> {
    console.info('Request from: ', this.apiName);
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
      console.error(
        `|${this.apiName}: ${new Date().toLocaleString()}|\n Failed to fetch url: ${url}`,
        (e as Error).message,
      );
      throw e;
    }
  }
}
