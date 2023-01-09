import qs from "qs";

export const apiFetch = async <T = any>(uri: string): Promise<T> => {
  const res = await fetch(uri);

  if (!res.ok) {
    throw new Error(`ERROR: Failed to fetch | ${res.status} ${res.statusText}`);
  }

  try {
    return await res.json();
  } catch (e) {
    throw Error(`Error in JSON formatting | ${e}`);
  }
};

export const apiFetchDefault = async <T>(
  path: string,
  options?: any
): Promise<T> => {
  if (!options?.locale) {
    options = { ...options, locale: "en" };
  }

  const query = qs.stringify(options, { addQueryPrefix: true });

  const res = await apiFetch(`${path}${query}`);

  return res.docs;
};
