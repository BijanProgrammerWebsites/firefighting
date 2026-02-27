import { StatusEnum } from "@/enums/status.enum";
import { z } from "@/lib/zod";

import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export const CreateInspectionSchema = z.object({
  equipmentId: z.uuid(),
  answers: z.array(
    z.object({
      questionId: z.uuid(),
      status: z.enum(StatusEnum),
      text: z.string().nonempty(),
      picture: z.string().nullable().optional(),
    }),
  ),
});

export type CreateInspectionRequestDto = z.infer<typeof CreateInspectionSchema>;

export async function createInspectionApi(
  dto: CreateInspectionRequestDto,
): Promise<ResponseDto> {
  return richFetch("/inspections", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}
