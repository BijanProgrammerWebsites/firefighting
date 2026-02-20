import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import styles from "./page.module.css";

export const generateMetadata = generateDynamicMetadata("AdminGeneralPage");

export default async function GeneralPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminGeneralPage");

  return <div className={styles.general}>{t("title")}</div>;
}
