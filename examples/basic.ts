import { Blog, Opening, Page } from "../types";
import { Butler, ButlerConfig, createButlerInstance } from "./butler";
import { GlobalRef } from "./global-ref";

interface ButlerModels {
  blogs: Blog;
  openings: Opening;
  pages: Page;
}

const butlerMockData: ButlerModels = {
  blogs: {
    id: "0",
    slug: "blog-slug",
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    title: "Je moeder is een plopkoek",
    body: [{ name: "Je moeder" }],
  },
  pages: {
    id: "0",
    slug: "page-slug",
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    title: "Coole pagina vriend",
    redirect: "www.google.com",
    body: [{ name: "Je moeder" }],
  },
  openings: {
    id: "0",
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    crowdPullers: [{ name: "Je moeder" }],
    title: "string",
    date: new Date().toString(),
    hoursOpen: 3,
    isSpecialOpening: true,
    lunarPhase: "half",
  },
};

const config: ButlerConfig = {
  // mode: process.env.NODE_ENV === "production" ? "apiOnly" : "hybrid",
  mode: "apiOnly",
};

const butlerGlobalStore = new GlobalRef<Butler<ButlerModels>>("butler_global");

if (!butlerGlobalStore.value) {
  butlerGlobalStore.value = createButlerInstance(
    process.env.API_URL || "http://localhost:8000/api",
    butlerMockData,
    config
  );
}

export const butler = butlerGlobalStore.value;
