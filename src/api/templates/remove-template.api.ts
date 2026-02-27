import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export async function removeTemplateApi(id: string): Promise<ResponseDto> {
  return richFetch(`/templates/${id}`, { method: "DELETE" });
}
