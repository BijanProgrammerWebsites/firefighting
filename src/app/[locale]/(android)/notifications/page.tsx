import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { Box } from "@mantine/core";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

export const generateMetadata = generateDynamicMetadata("NotificationsPage");

export default async function NotificationsPage(): Promise<ReactNode> {
  const t = await getTranslations("NotificationsPage");

  return <Box>{t("title")}</Box>;
}
