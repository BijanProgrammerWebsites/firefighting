import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import DefectListComponent from "@/android/defects/components/defect-list/defect-list.component";

import styles from "./page.module.css";

export const generateMetadata = generateDynamicMetadata("DefectsPage");

export default async function DefectsPage(): Promise<ReactNode> {
  const t = await getTranslations("DefectsPage");

  return (
    <div className={styles.defects}>
      <ToolbarComponent title={t("title")} />
      <DefectListComponent />
    </div>
  );
}
