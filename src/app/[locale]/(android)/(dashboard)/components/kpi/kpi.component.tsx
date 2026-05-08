"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { SimpleGrid } from "@mantine/core";

import IconComponent from "@/components/icon/icon.component";

import { StatusEnum } from "@/enums/status.enum";

import KpiChart from "@/android/(dashboard)/charts/kpi.chart";

export default function KpiComponent(): ReactNode {
  const t = useTranslations("DashboardPage");

  return (
    <SimpleGrid cols={2}>
      <KpiChart
        title={t("totalAssets")}
        value={831}
        status={StatusEnum.OK}
        icon={<IconComponent name="box-minimalistic-linear" />}
      />
      <KpiChart
        title={t("outOfServiceAssets")}
        value={17}
        status={StatusEnum.WARNING}
        icon={<IconComponent name="box-minimalistic-linear" />}
      />
      <KpiChart
        title={t("inspectionsDueToday")}
        value={29}
        status={StatusEnum.OK}
        icon={<IconComponent name="magnifer-bug-linear" />}
      />
      <KpiChart
        title={t("overdueInspections")}
        value={3}
        status={StatusEnum.WARNING}
        icon={<IconComponent name="magnifer-bug-linear" />}
      />
      <KpiChart
        title={t("openDefects")}
        value={15}
        status={StatusEnum.WARNING}
        icon={<IconComponent name="shield-warning-linear" />}
      />
      <KpiChart
        title={t("criticalDefects")}
        value={1}
        status={StatusEnum.ERROR}
        icon={<IconComponent name="shield-warning-linear" />}
      />
    </SimpleGrid>
  );
}
