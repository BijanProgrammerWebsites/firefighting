import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { Box } from "@mantine/core";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

export const generateMetadata = generateDynamicMetadata("SettingsPage");

export default async function SettingsPage(): Promise<ReactNode> {
  const t = await getTranslations("SettingsPage");

  return <Box>{t("title")}</Box>;
}
