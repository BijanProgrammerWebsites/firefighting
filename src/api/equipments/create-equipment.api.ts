import { z } from "@/lib/zod";

import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export const CreateEquipmentSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  standardId: z.uuid(),
  inspectionPeriod: z.int().positive(),
});

export type CreateEquipmentRequestDto = z.infer<typeof CreateEquipmentSchema>;

export async function createEquipmentApi(
  dto: CreateEquipmentRequestDto,
): Promise<ResponseDto> {
  return richFetch("/equipments", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}
