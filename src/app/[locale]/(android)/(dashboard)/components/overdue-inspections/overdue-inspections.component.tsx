"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Text, Title } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

import { findAllBucketsApi } from "@/api/equipments/find-all-buckets.api";

import LoadingComponent from "@/components/loading/loading.component";

import { equipmentKeys } from "@/queries/keys";

import BucketComponent from "@/android/inspections/components/bucket/bucket.component";

export default function OverdueInspectionsComponent(): ReactNode {
  const t = useTranslations("DashboardPage");

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

  return (
    <div>
      <Title order={3} mb={8}>
        {t("overdueInspections")}
      </Title>
      <BucketComponent items={data.overdue} />
    </div>
  );
}
