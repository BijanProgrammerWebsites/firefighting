import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import styles from "./page.module.css";

export const generateMetadata = generateDynamicMetadata("AdminLogsPage");

export default async function LogsPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminLogsPage");

  return <div className={styles.logs}>{t("title")}</div>;
}
