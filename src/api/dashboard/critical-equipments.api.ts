import { Equipment } from "@/entities/equipment";

import { richFetch } from "@/utils/fetch.utils";

import { ScopeType } from "@/android/(dashboard)/types/scope.type";
import { generateScopeParams } from "@/android/(dashboard)/utils/scope.utils";

export async function criticalEquipmentsApi(
  scope: ScopeType,
): Promise<Equipment[]> {
  const data = await richFetch<Equipment[]>(
    `/dashboard/critical-equipments?${generateScopeParams(scope)}`,
  );

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
