import type { ResponseDto } from "@/dto/response.dto";

import { User } from "@/entities/user";

import { richFetch } from "@/utils/fetch.utils";

export type SignUpRequestDto = Pick<User, "username" | "password" | "role">;

export async function signUpApi(dto: SignUpRequestDto): Promise<ResponseDto> {
  return richFetch("/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}
