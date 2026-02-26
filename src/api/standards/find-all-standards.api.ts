import { Standard } from "@/entities/standard";

import { richFetch } from "@/utils/fetch.utils";

export async function findAllStandardsApi(): Promise<Standard[]> {
  const data = await richFetch<Standard[]>("/standards");

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
