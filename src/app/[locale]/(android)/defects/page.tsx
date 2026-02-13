import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import styles from "./page.module.css";

export default async function DefectsPage(): Promise<ReactNode> {
  const t = await getTranslations("DefectsPage");

  return <div className={styles.defects}>{t("title")}</div>;
}
