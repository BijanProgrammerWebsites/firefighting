import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import SimpleChartComponent from "@/android/(dashboard)/components/simple-chart/simple-chart.component";

import styles from "./page.module.css";

export const generateMetadata = generateDynamicMetadata("DashboardPage");

export default async function DashboardPage(): Promise<ReactNode> {
  const t = await getTranslations("DashboardPage");

  return (
    <div className={styles.dashboard}>
      <ToolbarComponent title={t("title")} />
      <SimpleChartComponent />
    </div>
  );
}
