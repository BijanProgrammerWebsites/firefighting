import { CreateEquipmentRequestDto } from "@/api/equipments/create-equipment.api";

import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export type EditEquipmentRequestDto = CreateEquipmentRequestDto & {
  id: string;
};

export async function editEquipmentApi({
  id,
  ...dto
}: EditEquipmentRequestDto): Promise<ResponseDto> {
  return richFetch(`/equipments/${id}`, {
    method: "PATCH",
    body: JSON.stringify(dto),
  });
}
