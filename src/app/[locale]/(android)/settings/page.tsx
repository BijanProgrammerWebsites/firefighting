import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import styles from "./page.module.css";

export const generateMetadata = generateDynamicMetadata("SettingsPage");

export default async function SettingsPage(): Promise<ReactNode> {
  const t = await getTranslations("SettingsPage");

  return <div className={styles.settings}>{t("title")}</div>;
}
