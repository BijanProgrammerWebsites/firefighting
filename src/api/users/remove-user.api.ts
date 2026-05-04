import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export async function removeUserApi(id: string): Promise<ResponseDto> {
  return richFetch(`/users/${id}`, { method: "DELETE" });
}
