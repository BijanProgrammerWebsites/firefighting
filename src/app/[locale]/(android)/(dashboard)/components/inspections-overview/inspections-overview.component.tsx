"use client";

import type { ReactNode } from "react";

import { Text } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

import { findAllBucketsApi } from "@/api/equipments/find-all-buckets.api";

import LoadingComponent from "@/components/loading/loading.component";

import { equipmentKeys } from "@/queries/keys";

import InspectionsOverviewChart from "@/android/(dashboard)/charts/inspections-overview.chart";

export default function InspectionsOverviewComponent(): ReactNode {
  const { isPending, isError, error, data } = useQuery({
    queryKey: equipmentKeys.buckets,
    queryFn: findAllBucketsApi,
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <Text c="red">{error.message}</Text>;
  }

  return <InspectionsOverviewChart data={data} />;
}
