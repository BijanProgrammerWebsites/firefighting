import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import styles from "./page.module.css";

export const generateMetadata = generateDynamicMetadata("AdminAssetsPage");

export default async function AssetsPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminAssetsPage");

  return <div className={styles.assets}>{t("title")}</div>;
}
