import { z } from "@/lib/zod";

import { CreateStandardRequestDto } from "@/api/standards/create-standard.api";

import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export type EditStandardRequestDto = CreateStandardRequestDto & { id: string };

export async function editStandardApi({
  id,
  ...dto
}: EditStandardRequestDto): Promise<ResponseDto> {
  return richFetch(`/standards/${id}`, {
    method: "PATCH",
    body: JSON.stringify(dto),
  });
}
