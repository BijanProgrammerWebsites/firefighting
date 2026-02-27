import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export async function deleteRefineryPictureApi(): Promise<ResponseDto> {
  return richFetch(`/refinery/picture`, { method: "DELETE" });
}
