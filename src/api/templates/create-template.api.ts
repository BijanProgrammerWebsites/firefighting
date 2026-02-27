import { z } from "@/lib/zod";

import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export const CreateTemplateSchema = z.object({
  title: z.string().nonempty(),
  questions: z.array(
    z.object({
      id: z.string(),
      title: z.string().nonempty(),
      description: z.string(),
    }),
  ),
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
