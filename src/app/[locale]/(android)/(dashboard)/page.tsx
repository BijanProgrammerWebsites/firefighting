import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import InspectionsOverviewComponent from "@/android/(dashboard)/components/inspections-overview/inspections-overview.component";
import KpiComponent from "@/android/(dashboard)/components/kpi/kpi.component";
import ScopeFilterComponent from "@/android/(dashboard)/components/scope-filter/scope-filter.component";
import DashboardProvider from "@/android/(dashboard)/providers/dashboard.provider";

import styles from "./page.module.css";

export const generateMetadata = generateDynamicMetadata("DashboardPage");

export default async function DashboardPage(): Promise<ReactNode> {
  const t = await getTranslations("DashboardPage");

  return (
    <DashboardProvider>
      <div className={styles.dashboard}>
        <ToolbarComponent title={t("title")} />
        <ScopeFilterComponent />
        <KpiComponent />
        <InspectionsOverviewComponent />
      </div>
    </DashboardProvider>
  );
}
