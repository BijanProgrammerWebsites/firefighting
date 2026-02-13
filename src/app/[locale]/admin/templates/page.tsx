import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import styles from "./page.module.css";

export default async function TemplatesPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminTemplatesPage");

  return <div className={styles.templates}>{t("title")}</div>;
}
