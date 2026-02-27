import { Unit } from "@/entities/unit";

import { richFetch } from "@/utils/fetch.utils";

export async function findOneUnitApi(id: string): Promise<Unit> {
  const data = await richFetch<Unit>(`/units/${id}`);

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
