import { Template } from "@/entities/template";

import { richFetch } from "@/utils/fetch.utils";

export async function findOneTemplateApi(id: string): Promise<Template> {
  const data = await richFetch<Template>(`/templates/${id}`);

  if ("error" in data) {
    throw new Error(data.error);
  }

  return data.result;
}
