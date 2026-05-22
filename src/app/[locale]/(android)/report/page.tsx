import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

export const generateMetadata = generateDynamicMetadata("ReportPage");

export default async function ReportPage(): Promise<ReactNode> {
  const t = await getTranslations("ReportPage");

  return <div>{t("title")}</div>;
}
