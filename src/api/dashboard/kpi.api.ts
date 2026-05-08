import { richFetch } from "@/utils/fetch.utils";
import { fakeDelay } from "@/utils/time.utils";

import { KpiType } from "@/android/(dashboard)/types/kpi.type";

export async function kpiApi(): Promise<KpiType> {
  await fakeDelay(1000);

  const data = await richFetch<KpiType>("/dashboard/kpi");

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
