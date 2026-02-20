import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import styles from "./page.module.css";

export const generateMetadata = generateDynamicMetadata("AdminStandardsPage");

export default async function StandardsPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminStandardsPage");

  return <div className={styles.standards}>{t("title")}</div>;
}
