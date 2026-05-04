import { SafeUser } from "@/entities/user";

import { richFetch } from "@/utils/fetch.utils";

export async function findOneUserApi(id: string): Promise<SafeUser> {
  const data = await richFetch<SafeUser>(`/users/${id}`);

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
