import { createModel } from "./helpers/helpers";

export interface ButlerConfig {
  mode?: "apiOnly" | "mockOnly" | "hybrid";
}

export interface ButlerRequestOptions {
  where?: any;
  sort?: any;
  limit?: number;
  page?: number;
}

type ButlerModels<Models> = {
  [Key in keyof Models]: CRUD<Models[Key]>;
};

export type CRUD<Model> = {
  fetch: (options?: ButlerRequestOptions) => Promise<Model[]>;
  fetchOne: (id?: string, options?: ButlerRequestOptions) => Promise<Model>;
  create: (body?: Model, options?: ButlerRequestOptions) => Promise<Model>;
  update: (
    id?: string,
    body?: Model,
    options?: ButlerRequestOptions
  ) => Promise<Model>;
  updateMany: (
    body?: Model,
    options?: ButlerRequestOptions
  ) => Promise<Model[]>;
  delete: (id?: string, options?: ButlerRequestOptions) => Promise<boolean>;
  deleteMany: (options?: ButlerRequestOptions) => Promise<boolean>;
};

export type Butler<Models> = ButlerModels<Models>;

export const createButlerInstance = <MockData extends Object>(
  apiUrl: string,
  mockData: MockData,
  config: ButlerConfig
): Butler<MockData> => {
  const store: any = {
    ...config,
  };

  store.fetchOrMock = async (fetch: (_?: any) => Promise<any>, mock: any) => {
    switch (config.mode) {
      case "apiOnly":
        return fetch();
      case "mockOnly":
        return mock;
      case "hybrid":
      default:
        return fetch().catch(() => mock);
    }
  };

  const models = Object.keys(mockData);

  let butlerModels: any = {};

  models.forEach((model) => {
    butlerModels[model] = createModel(
      apiUrl,
      model,
      (mockData as any)[model],
      store
    );
  });

  return butlerModels;
};
