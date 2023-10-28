export const getQueryArray = (
  map: Record<string, string | string[]>,
  query: string[] | string,
): string[] =>
  (Array.isArray(query) ? query.map((key) => map[key]) : [map[query]]).flat(Infinity) as string[];
