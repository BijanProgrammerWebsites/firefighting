import { Equipment } from "@/entities/equipment";

import { richFetch } from "@/utils/fetch.utils";

export type FindOneEquipmentResponseDto = Omit<Equipment, "inspections">;

export async function findOneEquipmentApi(
  id: string,
): Promise<FindOneEquipmentResponseDto> {
  const data = await richFetch<FindOneEquipmentResponseDto>(
    `/equipments/${id}`,
  );

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
