import { Site } from "@/entities/site";

import { richFetch } from "@/utils/fetch.utils";

export async function findOneSiteApi(id: string): Promise<Site> {
  const data = await richFetch<Site>(`/sites/${id}`);

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
