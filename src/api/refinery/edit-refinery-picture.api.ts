import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export type EditRefineryPictureRequestDto = { picture: File };

export async function editRefineryPictureApi({
  picture,
}: EditRefineryPictureRequestDto): Promise<ResponseDto> {
  const formData = new FormData();
  formData.append("picture", picture);

  return richFetch(`/refinery/picture`, {
    method: "PATCH",
    body: formData,
  });
}
