import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export async function removeEquipmentApi(id: string): Promise<ResponseDto> {
  return richFetch(`/equipments/${id}`, { method: "DELETE" });
}
