import { Zone } from "@/entities/zone";

import { richFetch } from "@/utils/fetch.utils";

export async function findAllZonesApi(): Promise<Zone[]> {
  const data = await richFetch<Zone[]>("/zones");

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
