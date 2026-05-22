"use client";

import { ReactNode, use } from "react";

import { useTranslations } from "next-intl";

import { Text, Title } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

import { overdueApi } from "@/api/dashboard/overdue.api";

import LoadingComponent from "@/components/loading.component";

import { dashboardKeys } from "@/queries/keys";

import OverdueInspectionCardComponent from "@/android/(dashboard)/components/overdue-inspection-card.component";
import { DashboardContext } from "@/android/(dashboard)/context/dashboard.context";

export default function OverdueInspectionListComponent(): ReactNode {
  const t = useTranslations("DashboardPage");

  const { scope } = use(DashboardContext);

  const { isPending, isError, error, data } = useQuery({
    queryKey: dashboardKeys.overdue(scope),
    queryFn: () => overdueApi(scope),
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <Text c="red">{error.message}</Text>;
  }

  if (data.length === 0) {
    return null;
  }

  return (
    <div>
      <Title order={3} mb={8}>
        {t("overdueInspections")}
      </Title>
      {data.map((item) => (
        <OverdueInspectionCardComponent key={item.inspection.id} item={item} />
      ))}
    </div>
  );
}
