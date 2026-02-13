import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import styles from "./page.module.css";

export default async function LogsPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminLogsPage");

  return <div className={styles.logs}>{t("title")}</div>;
}
