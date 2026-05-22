import { richFetch } from "@/utils/fetch.utils";

import { ScopeType } from "@/android/(dashboard)/types/scope.type";
import { generateScopeParams } from "@/android/(dashboard)/utils/scope.utils";

export type defectsAgingDto = {
  averageDaysOpen: number;
  oldestDaysOpen: number;
};

export async function defectsAgingApi(
  scope: ScopeType,
): Promise<defectsAgingDto> {
  const data = await richFetch<defectsAgingDto>(
    `/dashboard/defects-aging?${generateScopeParams(scope)}`,
  );

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
