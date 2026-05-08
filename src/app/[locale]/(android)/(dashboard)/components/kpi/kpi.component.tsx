"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { SimpleGrid, Text } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

import { kpiApi } from "@/api/dashboard/kpi.api";

import IconComponent from "@/components/icon/icon.component";

import { StatusEnum } from "@/enums/status.enum";

import { dashboardKeys } from "@/queries/keys";

import KpiChart from "@/android/(dashboard)/charts/kpi.chart";

export default function KpiComponent(): ReactNode {
  const t = useTranslations("DashboardPage");

  const { isPending, isError, error, data } = useQuery({
    queryKey: dashboardKeys.kpi,
    queryFn: kpiApi,
  });

  if (isError) {
    return <Text c="red">{error.message}</Text>;
  }

  return (
    <SimpleGrid cols={2}>
      <KpiChart
        title={t("totalEquipments")}
        value={data?.totalEquipments}
        status={StatusEnum.OK}
        isLoading={isPending}
        icon={<IconComponent name="box-minimalistic-linear" />}
      />
      <KpiChart
        title={t("outOfServiceEquipments")}
        value={data?.outOfServiceEquipments}
        status={
          data?.outOfServiceEquipments === 0 ? StatusEnum.OK : StatusEnum.ERROR
        }
        isLoading={isPending}
        icon={<IconComponent name="box-minimalistic-linear" />}
      />
      <KpiChart
        title={t("todayRemainingInspections")}
        value={data?.todayRemainingInspections}
        status={
          data?.todayRemainingInspections === 0
            ? StatusEnum.OK
            : StatusEnum.WARNING
        }
        isLoading={isPending}
        icon={<IconComponent name="magnifer-bug-linear" />}
      />
      <KpiChart
        title={t("overdueInspections")}
        value={data?.overdueInspections}
        status={
          data?.overdueInspections === 0 ? StatusEnum.OK : StatusEnum.ERROR
        }
        isLoading={isPending}
        icon={<IconComponent name="magnifer-bug-linear" />}
      />
      <KpiChart
        title={t("totalDefects")}
        value={data?.totalDefects}
        status={data?.totalDefects === 0 ? StatusEnum.OK : StatusEnum.WARNING}
        isLoading={isPending}
        icon={<IconComponent name="shield-warning-linear" />}
      />
      <KpiChart
        title={t("criticalDefects")}
        value={data?.criticalDefects}
        status={data?.criticalDefects === 0 ? StatusEnum.OK : StatusEnum.ERROR}
        isLoading={isPending}
        icon={<IconComponent name="shield-warning-linear" />}
      />
    </SimpleGrid>
  );
}
