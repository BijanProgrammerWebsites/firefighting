import { CreateTemplateRequestDto } from "@/api/templates/create-template.api";

import { ResponseDto } from "@/dto/response.dto";

import { richFetch } from "@/utils/fetch.utils";

export type EditTemplateRequestDto = CreateTemplateRequestDto & { id: string };

export async function editTemplateApi({
  id,
  ...dto
}: EditTemplateRequestDto): Promise<ResponseDto> {
  return richFetch(`/templates/${id}`, {
    method: "PATCH",
    body: JSON.stringify(dto),
  });
}
