import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import styles from "./page.module.css";

export const generateMetadata = generateDynamicMetadata("AdminTemplatesPage");

export default async function TemplatesPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminTemplatesPage");

  return <div className={styles.templates}>{t("title")}</div>;
}
