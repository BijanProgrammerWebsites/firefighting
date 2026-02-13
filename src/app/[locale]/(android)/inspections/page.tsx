import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import styles from "./page.module.css";

export default async function InspectionsPage(): Promise<ReactNode> {
  const t = await getTranslations("InspectionsPage");

  return <div className={styles.inspections}>{t("title")}</div>;
}
