import { ButlerRequestOptions } from "../butler";
import { apiFetchDefault } from "./http";

export const fetchFactory = (uri: string, mockData: any, store: any) => {
  return async (options?: ButlerRequestOptions) => {
    const fetch = async () => {
      return apiFetchDefault<any[]>(uri, options);
    };

    return store.fetchOrMock(fetch, new Array(5).fill(mockData));
  };
};

export const fetchOneFactory = (uri: string, mockData: any, store: any) => {
  return async (id?: string, options?: ButlerRequestOptions) => {
    const fetch = async () => {
      return apiFetchDefault<any>(`${uri}/${id}`, options);
    };

    return store.fetchOrMock(fetch, mockData);
  };
};
