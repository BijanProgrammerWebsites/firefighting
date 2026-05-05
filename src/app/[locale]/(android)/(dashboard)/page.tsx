import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import styles from "./page.module.css";

export const generateMetadata = generateDynamicMetadata("DashboardPage");

export default async function DashboardPage(): Promise<ReactNode> {
  const t = await getTranslations("DashboardPage");

  return <div className={styles.dashboard}>{t("title")}</div>;
}
