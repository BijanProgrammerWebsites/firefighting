import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export async function removeSiteApi(id: string): Promise<ResponseDto> {
  return richFetch(`/sites/${id}`, { method: "DELETE" });
}
