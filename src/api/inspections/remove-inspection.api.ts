import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export async function removeInspectionApi(id: string): Promise<ResponseDto> {
  return richFetch(`/inspections/${id}`, { method: "DELETE" });
}
