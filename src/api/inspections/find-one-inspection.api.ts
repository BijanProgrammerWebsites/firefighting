import { Inspection } from "@/entities/inspection";

import { richFetch } from "@/utils/fetch.utils";

export async function findOneInspectionApi(id: string): Promise<Inspection> {
  const data = await richFetch<Inspection>(`/inspections/${id}`);

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
