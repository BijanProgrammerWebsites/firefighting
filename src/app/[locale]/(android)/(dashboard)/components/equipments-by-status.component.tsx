"use client";

import { ReactNode, use } from "react";

import { useTranslations } from "next-intl";

import { Box, Text, Title } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

import { equipmentsByStatusApi } from "@/api/dashboard/equipments-by-status.api";

import LoadingComponent from "@/components/loading.component";

import { dashboardKeys } from "@/queries/keys";

import EquipmentsByStatusChart from "@/android/(dashboard)/charts/equipments-by-status.chart";
import { DashboardContext } from "@/android/(dashboard)/context/dashboard.context";

export default function EquipmentsByStatusComponent(): ReactNode {
  const t = useTranslations("DashboardPage");

  const { scope } = use(DashboardContext);

  const { isPending, isError, error, data } = useQuery({
    queryKey: dashboardKeys.equipmentsByStatus(scope),
    queryFn: () => equipmentsByStatusApi(scope),
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <Text c="red">{error.message}</Text>;
  }

  return (
    <Box>
      <Title order={3} mb={8}>
        {t("equipmentsByStatus")}
      </Title>
      <EquipmentsByStatusChart data={data} />
    </Box>
  );
}
