import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import styles from "./page.module.css";

export default async function StandardsPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminStandardsPage");

  return <div className={styles.standards}>{t("title")}</div>;
}
