import { CreateZoneRequestDto } from "@/api/zones/create-zone.api";

import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export type EditZoneRequestDto = Omit<CreateZoneRequestDto, "siteId"> & {
  id: string;
};

export async function editZoneApi({
  id,
  ...dto
}: EditZoneRequestDto): Promise<ResponseDto> {
  return richFetch(`/zones/${id}`, {
    method: "PATCH",
    body: JSON.stringify(dto),
  });
}
