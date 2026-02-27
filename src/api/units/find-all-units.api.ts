import { Unit } from "@/entities/unit";

import { richFetch } from "@/utils/fetch.utils";

export async function findAllUnitsApi(): Promise<Unit[]> {
  const data = await richFetch<Unit[]>("/units");

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
