import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import styles from "./page.module.css";

export const generateMetadata = generateDynamicMetadata("NotificationsPage");

export default async function NotificationsPage(): Promise<ReactNode> {
  const t = await getTranslations("NotificationsPage");

  return <div className={styles.notifications}>{t("title")}</div>;
}
