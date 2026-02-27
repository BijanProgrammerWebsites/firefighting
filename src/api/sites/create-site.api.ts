import { z } from "@/lib/zod";

import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export const CreateSiteSchema = z.object({
  title: z.string().nonempty(),
});

export type CreateSitesRequestDto = z.infer<typeof CreateSiteSchema>;

export async function createSiteApi(
  dto: CreateSitesRequestDto,
): Promise<ResponseDto> {
  return richFetch("/sites", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}
