import { z } from "@/lib/zod";

import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export const CreateTemplateSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  standardId: z.uuid(),
  inspectionPeriod: z.int().positive(),
});

export type CreateTemplateRequestDto = z.infer<typeof CreateTemplateSchema>;

export async function createTemplateApi(
  dto: CreateTemplateRequestDto,
): Promise<ResponseDto> {
  return richFetch("/templates", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}
