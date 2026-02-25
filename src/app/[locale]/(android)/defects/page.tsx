import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import styles from "./page.module.css";

export const generateMetadata = generateDynamicMetadata("DefectsPage");

export default async function DefectsPage(): Promise<ReactNode> {
  const t = await getTranslations("DefectsPage");

  return <div className={styles.defects}>{t("title")}</div>;
}
