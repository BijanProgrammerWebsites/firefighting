import { Template } from "@/entities/template";

import { richFetch } from "@/utils/fetch.utils";

export type FindOneTemplateResponseDto = Omit<
  Template,
  "standard" | "equipments"
> & {
  standardId: string;
};

export async function findOneTemplateApi(
  id: string,
): Promise<FindOneTemplateResponseDto> {
  const data = await richFetch<FindOneTemplateResponseDto>(`/templates/${id}`);

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
