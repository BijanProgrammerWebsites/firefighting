import { ResponseDto } from "@/dto/response.dto";

import { Refinery } from "@/entities/refinery";

import { richFetch } from "@/utils/fetch.utils";

export type EditRefineryRequestDto = Pick<Refinery, "title">;

export async function editRefineryApi({
  ...dto
}: EditRefineryRequestDto): Promise<ResponseDto> {
  return richFetch(`/refinery`, {
    method: "PATCH",
    body: JSON.stringify(dto),
  });
}
