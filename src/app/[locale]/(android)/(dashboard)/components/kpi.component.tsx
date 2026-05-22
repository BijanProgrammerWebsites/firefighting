"use client";

import { ReactNode, use } from "react";

import { useTranslations } from "next-intl";

import { SimpleGrid, Text } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

import { kpiApi } from "@/api/dashboard/kpi.api";

import IconComponent from "@/components/icon/icon.component";

import { dashboardKeys } from "@/queries/keys";

import KpiChart from "@/android/(dashboard)/charts/kpi.chart";
import { DashboardContext } from "@/android/(dashboard)/context/dashboard.context";

export default function KpiComponent(): ReactNode {
  const t = useTranslations("DashboardPage");

  const { scope } = use(DashboardContext);

  const { isPending, isError, error, data } = useQuery({
    queryKey: dashboardKeys.kpi(scope),
    queryFn: () => kpiApi(scope),
  });

  if (isError) {
    return <Text c="red">{error.message}</Text>;
  }

  return (
    <SimpleGrid cols={2}>
      <KpiChart
        title={t("totalEquipments")}
        value={data?.totalEquipments}
        color="dark"
        isLoading={isPending}
        icon={<IconComponent name="box-minimalistic-linear" />}
      />
      <KpiChart
        title={t("outOfServiceEquipments")}
        value={data?.outOfServiceEquipments}
        color={data?.outOfServiceEquipments === 0 ? "dark" : "red"}
        isLoading={isPending}
        icon={<IconComponent name="box-minimalistic-linear" />}
      />
      <KpiChart
        title={t("todayRemainingInspections")}
        value={data?.todayRemainingInspections}
        color={data?.todayRemainingInspections === 0 ? "dark" : "yellow"}
        isLoading={isPending}
        icon={<IconComponent name="magnifer-bug-linear" />}
      />
      <KpiChart
        title={t("overdueInspections")}
        value={data?.overdueInspections}
        color={data?.overdueInspections === 0 ? "dark" : "red"}
        isLoading={isPending}
        icon={<IconComponent name="magnifer-bug-linear" />}
      />
      <KpiChart
        title={t("totalDefects")}
        value={data?.totalDefects}
        color={data?.totalDefects === 0 ? "dark" : "yellow"}
        isLoading={isPending}
        icon={<IconComponent name="shield-warning-linear" />}
      />
      <KpiChart
        title={t("criticalDefects")}
        value={data?.criticalDefects}
        color={data?.criticalDefects === 0 ? "dark" : "red"}
        isLoading={isPending}
        icon={<IconComponent name="shield-warning-linear" />}
      />
    </SimpleGrid>
  );
}
