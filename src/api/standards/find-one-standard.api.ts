import { Standard } from "@/entities/standard";

import { richFetch } from "@/utils/fetch.utils";

export async function findOneStandardApi(id: string): Promise<Standard> {
  const data = await richFetch<Standard>(`/standards/${id}`);

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
