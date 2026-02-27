import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import BucketsComponent from "@/android/inspections/components/buckets/buckets.component";

import styles from "./page.module.css";

export const generateMetadata = generateDynamicMetadata("InspectionsPage");

export default async function InspectionsPage(): Promise<ReactNode> {
  const t = await getTranslations("InspectionsPage");

  return (
    <div className={styles.inspections}>
      <ToolbarComponent title={t("title")} />
      <BucketsComponent />
    </div>
  );
}
