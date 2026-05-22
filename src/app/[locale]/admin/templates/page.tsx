import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { Box } from "@mantine/core";

import ToolbarComponent from "@/components/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import TemplateListComponent from "@/admin/templates/components/template-list.component";

export const generateMetadata = generateDynamicMetadata("AdminTemplatesPage");

export default async function TemplatesPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminTemplatesPage");

  return (
    <Box>
      <ToolbarComponent
        title={t("title")}
        createHref="/admin/templates/create"
      />
      <TemplateListComponent />
    </Box>
  );
}
