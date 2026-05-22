import { richFetch } from "@/utils/fetch.utils";

import { ScopeType } from "@/android/(dashboard)/types/scope.type";
import { generateScopeParams } from "@/android/(dashboard)/utils/scope.utils";

export type equipmentsByStatusDto = {
  inService?: number;
  needsRepair?: number;
  outOfService?: number;
};

export async function equipmentsByStatusApi(
  scope: ScopeType,
): Promise<equipmentsByStatusDto> {
  const data = await richFetch<equipmentsByStatusDto>(
    `/dashboard/equipments-by-status?${generateScopeParams(scope)}`,
  );

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
