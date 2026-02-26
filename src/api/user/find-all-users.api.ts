import { PasswordlessUser } from "@/entities/user";

import { richFetch } from "@/utils/fetch.utils";

export type FindAllUsersApiResponseDto = PasswordlessUser[];

export async function findAllUsersApi(): Promise<FindAllUsersApiResponseDto> {
  const data = await richFetch<FindAllUsersApiResponseDto>("/users");

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
