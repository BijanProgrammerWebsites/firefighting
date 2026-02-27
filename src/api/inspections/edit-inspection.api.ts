import { CreateInspectionRequestDto } from "@/api/inspections/create-inspection.api";

import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export type EditInspectionRequestDto = CreateInspectionRequestDto & {
  id: string;
};

export async function editInspectionApi({
  id,
  ...dto
}: EditInspectionRequestDto): Promise<ResponseDto> {
  return richFetch(`/inspections/${id}`, {
    method: "PATCH",
    body: JSON.stringify(dto),
  });
}
