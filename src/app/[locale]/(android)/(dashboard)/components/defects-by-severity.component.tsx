"use client";

import { ReactNode, use } from "react";

import { useTranslations } from "next-intl";

import { Text, Title } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

import { defectsBySeverityApi } from "@/api/dashboard/defects-by-severity.api";

import LoadingComponent from "@/components/loading.component";

import { dashboardKeys } from "@/queries/keys";

import DefectsBySeverityChart from "@/android/(dashboard)/charts/defects-by-severity.chart";
import { DashboardContext } from "@/android/(dashboard)/context/dashboard.context";

export default function DefectsBySeverityComponent(): ReactNode {
  const t = useTranslations("DashboardPage");

  const { scope } = use(DashboardContext);

  const { isPending, isError, error, data } = useQuery({
    queryKey: dashboardKeys.defectsBySeverity(scope),
    queryFn: () => defectsBySeverityApi(scope),
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <Text c="red">{error.message}</Text>;
  }

  return (
    <div>
      <Title order={3} mb={8}>
        {t("defectsBySeverity")}
      </Title>
      <DefectsBySeverityChart data={data} />
    </div>
  );
}
