"use client";

import { ReactNode, use } from "react";

import { useTranslations } from "next-intl";

import { SimpleGrid, Text } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

import { defectsAgingApi } from "@/api/dashboard/defects-aging.api";

import IconComponent from "@/components/icon/icon.component";

import { dashboardKeys } from "@/queries/keys";

import KpiChart from "@/android/(dashboard)/charts/kpi.chart";
import { DashboardContext } from "@/android/(dashboard)/context/dashboard.context";

export default function DefectsAgingComponent(): ReactNode {
  const t = useTranslations("DashboardPage");

  const { scope } = use(DashboardContext);

  const { isPending, isError, error, data } = useQuery({
    queryKey: dashboardKeys.defectsAging(scope),
    queryFn: () => defectsAgingApi(scope),
  });

  if (isError) {
    return <Text c="red">{error.message}</Text>;
  }

  return (
    <SimpleGrid cols={2}>
      <KpiChart
        title={t("averageDaysOpen")}
        value={data?.averageDaysOpen}
        color={data && data?.averageDaysOpen <= 1 ? "green" : "yellow"}
        isLoading={isPending}
        icon={<IconComponent name="shield-warning-linear" />}
      />
      <KpiChart
        title={t("oldestDaysOpen")}
        value={data?.oldestDaysOpen}
        color={data && data?.oldestDaysOpen <= 1 ? "green" : "yellow"}
        isLoading={isPending}
        icon={<IconComponent name="shield-warning-linear" />}
      />
    </SimpleGrid>
  );
}
