import { Equipment } from "@/entities/equipment";

import { richFetch } from "@/utils/fetch.utils";

export type FindAllEquipmentsResponseDto = Omit<
  Equipment,
  "inspections" | "defects"
>[];

export async function findAllEquipmentsApi(): Promise<FindAllEquipmentsResponseDto> {
  const data = await richFetch<FindAllEquipmentsResponseDto>("/equipments");

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
