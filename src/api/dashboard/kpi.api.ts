import { richFetch } from "@/utils/fetch.utils";

import { KpiType } from "@/android/(dashboard)/types/kpi.type";
import { ScopeType } from "@/android/(dashboard)/types/scope.type";
import { generateScopeParams } from "@/android/(dashboard)/utils/scope.utils";

export async function kpiApi(scope: ScopeType): Promise<KpiType> {
  const data = await richFetch<KpiType>(
    `/dashboard/kpi?${generateScopeParams(scope)}`,
  );

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
