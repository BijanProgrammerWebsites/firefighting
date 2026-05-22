import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { Box } from "@mantine/core";

import ToolbarComponent from "@/components/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import TemplateFormComponent from "@/admin/templates/components/template-form.component";

export const generateMetadata = generateDynamicMetadata("AdminTemplatesPage");

export default async function CreateTemplatePage(): Promise<ReactNode> {
  const t = await getTranslations("AdminTemplatesPage");

  return (
    <Box>
      <ToolbarComponent title={t("create")} parentHref="/admin/templates" />
      <TemplateFormComponent />
    </Box>
  );
}
