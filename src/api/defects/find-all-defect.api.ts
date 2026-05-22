import { Defect } from "@/entities/defect";

import { richFetch } from "@/utils/fetch.utils";

export async function findAllDefectApi(): Promise<Defect[]> {
  const data = await richFetch<Defect[]>("/defects");

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
