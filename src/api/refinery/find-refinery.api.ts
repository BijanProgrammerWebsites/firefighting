import { Refinery } from "@/entities/refinery";

import { richFetch } from "@/utils/fetch.utils";

export type FindRefineryDto = Omit<Refinery, "sites">;

export async function findRefineryApi(): Promise<FindRefineryDto> {
  const data = await richFetch<FindRefineryDto>("/refinery");

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
