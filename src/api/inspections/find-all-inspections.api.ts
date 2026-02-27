import { Inspection } from "@/entities/inspection";

import { richFetch } from "@/utils/fetch.utils";

export async function findAllInspectionsApi(): Promise<Inspection[]> {
  const data = await richFetch<Inspection[]>("/inspections");

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
