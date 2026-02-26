import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export async function removeStandardApi(id: string): Promise<ResponseDto> {
  return richFetch(`/standards/${id}`, { method: "DELETE" });
}
