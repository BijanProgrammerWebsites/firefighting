import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { Box } from "@mantine/core";

import ToolbarComponent from "@/components/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import StandardFormComponent from "@/admin/standards/components/standard-form.component";

export const generateMetadata = generateDynamicMetadata("AdminStandardsPage");

export default async function CreateStandardPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminStandardsPage");

  return (
    <Box>
      <ToolbarComponent title={t("create")} parentHref="/admin/standards" />
      <StandardFormComponent />
    </Box>
  );
}
