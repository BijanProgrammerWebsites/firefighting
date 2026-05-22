import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { Stack } from "@mantine/core";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import DefectsAgingComponent from "@/android/(dashboard)/components/defects-aging.component";
import DefectsBySeverityComponent from "@/android/(dashboard)/components/defects-by-severity.component";
import InspectionsOverviewComponent from "@/android/(dashboard)/components/inspections-overview.component";
import KpiComponent from "@/android/(dashboard)/components/kpi.component";
import OverdueInspectionListComponent from "@/android/(dashboard)/components/overdue-inspection-list.component";
import ScopeFilterComponent from "@/android/(dashboard)/components/scope-filter.component";
import DashboardProvider from "@/android/(dashboard)/providers/dashboard.provider";

export const generateMetadata = generateDynamicMetadata("DashboardPage");

export default async function DashboardPage(): Promise<ReactNode> {
  const t = await getTranslations("DashboardPage");

  return (
    <DashboardProvider>
      <Stack>
        <ToolbarComponent
          noMargin
          title={t("title")}
          subtitle={<ScopeFilterComponent />}
        />
        <KpiComponent />
        <InspectionsOverviewComponent />
        <OverdueInspectionListComponent />
        <DefectsBySeverityComponent />
        <DefectsAgingComponent />
      </Stack>
    </DashboardProvider>
  );
}
