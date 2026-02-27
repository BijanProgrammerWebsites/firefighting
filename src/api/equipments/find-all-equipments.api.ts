import { Equipment } from "@/entities/equipment";

import { richFetch } from "@/utils/fetch.utils";

export async function findAllEquipmentsApi(): Promise<Equipment[]> {
  const data = await richFetch<Equipment[]>("/equipments");

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
