import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import Chart7 from "@/android/(dashboard)/charts/7.chart";
import Chart8 from "@/android/(dashboard)/charts/8";
import Chart9 from "@/android/(dashboard)/charts/9";
import Chart10 from "@/android/(dashboard)/charts/10";
import Chart11 from "@/android/(dashboard)/charts/11";
import Chart12 from "@/android/(dashboard)/charts/12";
import Chart13 from "@/android/(dashboard)/charts/13";
import Chart14 from "@/android/(dashboard)/charts/14";
import Chart15 from "@/android/(dashboard)/charts/15";
import Chart16 from "@/android/(dashboard)/charts/16";
import Chart17 from "@/android/(dashboard)/charts/17";
import Chart18 from "@/android/(dashboard)/charts/18";
import Chart19 from "@/android/(dashboard)/charts/19";
import Chart3 from "@/android/(dashboard)/charts/chart3.chart";
import Chart4 from "@/android/(dashboard)/charts/chart4.chart";
import Chart5 from "@/android/(dashboard)/charts/chart5.chart";
import Chart6 from "@/android/(dashboard)/charts/chart6.chart";
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
      <Chart5 />
      <Chart6 />
      <Chart7 />
      <Chart8 />
      <Chart9 />
      <Chart10 />
      <Chart11 />
      <Chart12 />
      <Chart13 />
      <Chart14 />
      <Chart15 />
      <Chart16 />
      <Chart17 />
      <Chart18 />
      <Chart19 />
      <Chart10 />
    </div>
  );
}
