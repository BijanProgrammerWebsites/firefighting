import { z } from "@/lib/zod";

import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export const CreateUnitSchema = z.object({
  title: z.string().nonempty(),
});

export type CreateUnitRequestDto = z.infer<typeof CreateUnitSchema> & {
  zoneId: string;
};

export async function createUnitApi(
  dto: CreateUnitRequestDto,
): Promise<ResponseDto> {
  return richFetch("/units", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}
