import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import styles from "./page.module.css";

export default async function ReportPage(): Promise<ReactNode> {
  const t = await getTranslations("ReportPage");

  return <div className={styles.report}>{t("title")}</div>;
}
