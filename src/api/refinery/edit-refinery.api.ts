import { ResponseDto } from "@/dto/response.dto";

import { z } from "@/lib/zod";

import { richFetch } from "@/utils/fetch.utils";

export const EditRefineryRequestSchema = z.object({
  title: z.string().nonempty(),
});

export type EditRefineryRequestDto = z.infer<typeof EditRefineryRequestSchema>;

export async function editRefineryApi({
  ...dto
}: EditRefineryRequestDto): Promise<ResponseDto> {
  return richFetch(`/refinery`, {
    method: "PATCH",
    body: JSON.stringify(dto),
  });
}
