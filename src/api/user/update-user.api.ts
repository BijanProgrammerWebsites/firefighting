import type { ResponseDto } from "@/dto/response.dto";

import { User } from "@/entities/user";

import { richFetch } from "@/utils/fetch.utils";

export type UserUpdateRequestDto = Partial<User>;

export async function updateUser(
  dto: UserUpdateRequestDto,
): Promise<ResponseDto<User>> {
  return richFetch("/users/update", {
    method: "PATCH",
    body: JSON.stringify(dto),
  });
}
