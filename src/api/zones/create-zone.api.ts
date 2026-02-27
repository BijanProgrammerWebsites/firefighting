import { z } from "@/lib/zod";

import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export const CreateZoneSchema = z.object({
  title: z.string().nonempty(),
});

export type CreateZoneRequestDto = z.infer<typeof CreateZoneSchema> & {
  siteId: string;
};

export async function createZoneApi(
  dto: CreateZoneRequestDto,
): Promise<ResponseDto> {
  return richFetch("/zones", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}
