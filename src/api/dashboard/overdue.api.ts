import { Inspection } from "@/entities/inspection";

import { richFetch } from "@/utils/fetch.utils";

import { ScopeType } from "@/android/(dashboard)/types/scope.type";
import { generateScopeParams } from "@/android/(dashboard)/utils/scope.utils";

export type OverdueDtoItem = {
  inspection: Inspection;
  daysPassedSinceDeadline: number;
};

export type OverdueDto = OverdueDtoItem[];

export async function overdueApi(scope: ScopeType): Promise<OverdueDto> {
  const data = await richFetch<OverdueDto>(
    `/dashboard/overdue?${generateScopeParams(scope)}`,
  );

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
