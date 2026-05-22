import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import TemplateEditComponent from "@/admin/templates/components/template-edit/template-edit.component";

export const generateMetadata = generateDynamicMetadata("AdminTemplatesPage");

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditTemplatePage({
  params,
}: Props): Promise<ReactNode> {
  const { id } = await params;

  const t = await getTranslations("AdminTemplatesPage");

  return (
    <div>
      <ToolbarComponent title={t("edit")} parentHref="/admin/templates" />
      <TemplateEditComponent id={id} />
    </div>
  );
}
