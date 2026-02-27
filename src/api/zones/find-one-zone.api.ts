import { Zone } from "@/entities/zone";

import { richFetch } from "@/utils/fetch.utils";

export async function findOneZoneApi(id: string): Promise<Zone> {
  const data = await richFetch<Zone>(`/zones/${id}`);

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
