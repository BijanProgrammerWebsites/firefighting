import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export async function removeUnitApi(id: string): Promise<ResponseDto> {
  return richFetch(`/units/${id}`, { method: "DELETE" });
}
