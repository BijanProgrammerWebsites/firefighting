import { Refinery } from "@/entities/refinery";

import { richFetch } from "@/utils/fetch.utils";

export async function findDetailedApi(): Promise<Refinery> {
  const data = await richFetch<Refinery>("/refinery/detailed");

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
