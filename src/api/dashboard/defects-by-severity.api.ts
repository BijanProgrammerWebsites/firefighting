import { richFetch } from "@/utils/fetch.utils";

import { ScopeType } from "@/android/(dashboard)/types/scope.type";
import { generateScopeParams } from "@/android/(dashboard)/utils/scope.utils";

export type defectsBySeverityDto = {
  low?: number;
  medium?: number;
  high?: number;
  critical?: number;
};

export async function defectsBySeverityApi(
  scope: ScopeType,
): Promise<defectsBySeverityDto> {
  const data = await richFetch<defectsBySeverityDto>(
    `/dashboard/defects-by-severity?${generateScopeParams(scope)}`,
  );

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
