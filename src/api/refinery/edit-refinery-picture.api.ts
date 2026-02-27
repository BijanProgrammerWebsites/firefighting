import { ResponseDto } from "@/dto/response.dto";

import { Refinery } from "@/entities/refinery";

import { richFetch } from "@/utils/fetch.utils";

export type EditRefineryPictureRequestDto = Pick<Refinery, "picture">;

export async function editRefineryPictureApi({
  picture,
}: EditRefineryPictureRequestDto): Promise<ResponseDto> {
  const formData = new FormData();
  formData.append("picture", picture ?? "");

  return richFetch(`/refinery/picture`, {
    method: "PATCH",
    body: formData,
  });
}
