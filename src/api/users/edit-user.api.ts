import { CreateUserRequestDto } from "@/api/users/create-user.api";

import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export type EditUserRequestDto = CreateUserRequestDto & { id: string };

export async function editUserApi({
  id,
  ...dto
}: EditUserRequestDto): Promise<ResponseDto> {
  return richFetch(`/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(dto),
  });
}
