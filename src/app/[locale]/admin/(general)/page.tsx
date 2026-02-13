import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import styles from "./page.module.css";

export default async function GeneralPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminGeneralPage");

  return <div className={styles.general}>{t("title")}</div>;
}
