import { CreateUnitRequestDto } from "@/api/units/create-unit.api";

import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export type EditUnitRequestDto = Omit<CreateUnitRequestDto, "zoneId"> & {
  id: string;
};

export async function editUnitApi({
  id,
  ...dto
}: EditUnitRequestDto): Promise<ResponseDto> {
  return richFetch(`/units/${id}`, {
    method: "PATCH",
    body: JSON.stringify(dto),
  });
}
