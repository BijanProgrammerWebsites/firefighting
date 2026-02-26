import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import StandardListComponent from "@/admin/standards/components/standard-list/standard-list.component";

import styles from "./page.module.css";

export const generateMetadata = generateDynamicMetadata("AdminStandardsPage");

export default async function StandardsPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminStandardsPage");

  return (
    <div className={styles.standards}>
      <ToolbarComponent title={t("title")} createHref="/standards/create" />
      <StandardListComponent />
    </div>
  );
}
