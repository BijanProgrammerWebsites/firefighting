import { CreateSitesRequestDto } from "@/api/sites/create-site.api";

import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export type EditSitesRequestDto = CreateSitesRequestDto & { id: string };

export async function editSiteApi({
  id,
  ...dto
}: EditSitesRequestDto): Promise<ResponseDto> {
  return richFetch(`/sites/${id}`, {
    method: "PATCH",
    body: JSON.stringify(dto),
  });
}
