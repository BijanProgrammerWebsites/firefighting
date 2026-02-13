import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import styles from "./page.module.css";

export default async function AssetsPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminAssetsPage");

  return <div className={styles.assets}>{t("title")}</div>;
}
