import { z } from "@/lib/zod";

import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export const CreateStandardSchema = z.object({
  title: z.string().nonempty(),
  questions: z.array(
    z.object({
      id: z.string(),
      title: z.string().nonempty(),
      description: z.string(),
    }),
  ),
});

export type CreateStandardRequestDto = z.infer<typeof CreateStandardSchema>;

export async function createStandardApi(
  dto: CreateStandardRequestDto,
): Promise<ResponseDto> {
  return richFetch("/standards", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}
