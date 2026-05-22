"use client";

import { ReactNode, use } from "react";

import { useTranslations } from "next-intl";

import { Box, Text, Title } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

import { findAllBucketsApi } from "@/api/equipments/find-all-buckets.api";

import LoadingComponent from "@/components/loading.component";

import { equipmentKeys } from "@/queries/keys";

import InspectionsOverviewChart from "@/android/(dashboard)/charts/inspections-overview.chart";
import { DashboardContext } from "@/android/(dashboard)/context/dashboard.context";

export default function InspectionsOverviewComponent(): ReactNode {
  const t = useTranslations("DashboardPage");

  const { scope } = use(DashboardContext);

  const { isPending, isError, error, data } = useQuery({
    queryKey: equipmentKeys.buckets(scope),
    queryFn: () => findAllBucketsApi(scope),
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
        {t("inspectionsOverview")}
      </Title>
      <InspectionsOverviewChart data={data} />
    </Box>
  );
}
