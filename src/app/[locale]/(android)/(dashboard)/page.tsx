import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import Chart3 from "@/android/(dashboard)/charts/chart3.chart";
import Chart4 from "@/android/(dashboard)/charts/chart4.chart";
import InspectionChart from "@/android/(dashboard)/charts/inspections.chart";

import Chart2 from "./charts/chart2.chart";

import styles from "./page.module.css";

export const generateMetadata = generateDynamicMetadata("DashboardPage");

export default async function DashboardPage(): Promise<ReactNode> {
  const t = await getTranslations("DashboardPage");

  return (
    <div className={styles.dashboard}>
      <ToolbarComponent title={t("title")} />
      <InspectionChart />
      <Chart2 />
      <Chart3 />
      <Chart4 />
    </div>
  );
}
