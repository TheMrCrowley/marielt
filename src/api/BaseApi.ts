const BASE_REVALIDATE_TIME = 60;

export const IMAGE_FIELDS_TO_POPULATE = ['width', 'height', 'url', 'placeholder'];

export const IMAGE_FIELDS_TO_POPULATE_WITH_META = [
  ...IMAGE_FIELDS_TO_POPULATE,
  'provider_metadata',
];

export const IMAGE_FIELDS_WITH_FORMATS = [...IMAGE_FIELDS_TO_POPULATE, 'formats'];

export default class BaseApi {
  public constructor(private readonly baseApiURL: string, private readonly apiName: string) {}

  private concatQueries(queries: string[]) {
    return `?${queries.join('&')}`;
  }

  protected getUrlWithQueries(url: string, ...query: string[]): string {
    return `${url}${this.concatQueries(query)}`;
  }

  protected getUrlWithId(url: string, id: string) {
    return `${url}/${id}`;
  }

  protected async fetchWrapper<T>(url: string, options?: RequestInit): Promise<T> {
    console.info('Request from: ', this.apiName);
    try {
      const response = await fetch(url, {
        ...options,

        next: {
          revalidate: options?.next?.revalidate ?? BASE_REVALIDATE_TIME,
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
