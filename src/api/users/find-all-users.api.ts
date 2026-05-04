import { SafeUser } from "@/entities/user";

import { richFetch } from "@/utils/fetch.utils";

export async function findAllUsersApi(): Promise<SafeUser[]> {
  const data = await richFetch<SafeUser[]>("/users");

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
