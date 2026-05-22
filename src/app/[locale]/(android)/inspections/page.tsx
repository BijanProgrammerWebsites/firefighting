import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { Box } from "@mantine/core";

import ToolbarComponent from "@/components/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import BucketsComponent from "@/android/inspections/components/buckets.component";

export const generateMetadata = generateDynamicMetadata("InspectionsPage");

export default async function InspectionsPage(): Promise<ReactNode> {
  const t = await getTranslations("InspectionsPage");

  return (
    <Box>
      <ToolbarComponent title={t("title")} />
      <BucketsComponent />
    </Box>
  );
}
