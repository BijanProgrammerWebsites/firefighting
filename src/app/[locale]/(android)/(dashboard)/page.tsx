import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { Stack } from "@mantine/core";

import ToolbarComponent from "@/components/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import CriticalEquipmentsComponent from "@/android/(dashboard)/components/critical-equipments.component";
import DefectsAgingComponent from "@/android/(dashboard)/components/defects-aging.component";
import DefectsBySeverityComponent from "@/android/(dashboard)/components/defects-by-severity.component";
import EquipmentsByStatusComponent from "@/android/(dashboard)/components/equipments-by-status.component";
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
      <Stack gap="sm">
        <ToolbarComponent
          noMargin
          title={t("title")}
          subtitle={<ScopeFilterComponent />}
        />
        <Stack gap={64}>
          <KpiComponent />
          <InspectionsOverviewComponent />
          <OverdueInspectionListComponent />
          <DefectsBySeverityComponent />
          <DefectsAgingComponent />
          <EquipmentsByStatusComponent />
          <CriticalEquipmentsComponent />
        </Stack>
      </Stack>
    </DashboardProvider>
  );
}
