import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { Box } from "@mantine/core";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import StandardListComponent from "@/admin/standards/components/standard-list.component";

export const generateMetadata = generateDynamicMetadata("AdminStandardsPage");

export default async function StandardsPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminStandardsPage");

  return (
    <Box>
      <ToolbarComponent
        title={t("title")}
        createHref="/admin/standards/create"
      />
      <StandardListComponent />
    </Box>
  );
}
