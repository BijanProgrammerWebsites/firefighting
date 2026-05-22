import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { Box } from "@mantine/core";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

export const generateMetadata = generateDynamicMetadata("AdminLogsPage");

export default async function LogsPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminLogsPage");

  return <Box>{t("title")}</Box>;
}
