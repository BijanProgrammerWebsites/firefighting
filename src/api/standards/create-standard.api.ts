import { ResponseDto } from "@/dto/response.dto";

import { Standard } from "@/entities/standard";

import { richFetch } from "@/utils/fetch.utils";

export type CreateStandardResponseDto = Omit<Standard, "id">;

export async function createStandardApi(
  dto: CreateStandardResponseDto,
): Promise<ResponseDto> {
  return richFetch("/standards/create", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}
