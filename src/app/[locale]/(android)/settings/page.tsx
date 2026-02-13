import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import styles from "./page.module.css";

export default async function SettingsPage(): Promise<ReactNode> {
  const t = await getTranslations("SettingsPage");

  return <div className={styles.settings}>{t("title")}</div>;
}
