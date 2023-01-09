import { CRUD } from "../butler";
import { fetchFactory, fetchOneFactory } from "./factories";

export const createModel = <Model>(
  baseUrl: string,
  model: string,
  mockData: Model,
  store: any
) => {
  return createModelFunctions(baseUrl, model, mockData, store);
};

export const createModelFunctions = <Model>(
  baseUrl: string,
  model: string,
  mockData: Model,
  store: any
) => {
  let res: Partial<CRUD<Model>> = {};

  let uri = `${baseUrl}/${model}`;

  res[`fetch`] = fetchFactory(uri, mockData, store);
  res[`fetchOne`] = fetchOneFactory(uri, mockData, store);

  return res;
};
