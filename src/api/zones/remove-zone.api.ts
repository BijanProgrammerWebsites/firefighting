import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export async function removeZoneApi(id: string): Promise<ResponseDto> {
  return richFetch(`/zones/${id}`, { method: "DELETE" });
}
