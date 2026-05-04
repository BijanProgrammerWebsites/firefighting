import { ResponseDto } from "@/dto/response.dto";

import { RoleEnum } from "@/enums/role.enum";

import { z } from "@/lib/zod";

import { richFetch } from "@/utils/fetch.utils";

export const CreateUserSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
  role: z.enum(RoleEnum),
});

export type CreateUserRequestDto = z.infer<typeof CreateUserSchema>;

export async function createUserApi(
  dto: CreateUserRequestDto,
): Promise<ResponseDto> {
  return richFetch("/users", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}
