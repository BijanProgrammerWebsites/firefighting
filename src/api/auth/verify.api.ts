import { User } from "@/entities/user";

import { richFetch } from "@/utils/fetch.utils";

export type VerifyResponseDto = Pick<User, "id" | "username" | "role">;

export async function verifyApi(): Promise<VerifyResponseDto> {
  const data = await richFetch<VerifyResponseDto>("/auth/verify");

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
