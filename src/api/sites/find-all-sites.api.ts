import { Site } from "@/entities/site";

import { richFetch } from "@/utils/fetch.utils";

export async function findAllSitesApi(): Promise<Site[]> {
  const data = await richFetch<Site[]>("/sites");

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
