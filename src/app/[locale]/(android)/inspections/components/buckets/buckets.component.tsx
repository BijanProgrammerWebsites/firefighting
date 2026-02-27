"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Text } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

import { findAllBucketsApi } from "@/api/equipments/find-all-buckets.api";

import LoadingComponent from "@/components/loading/loading.component";

import { equipmentKeys } from "@/queries/keys";

import BucketComponent from "@/android/inspections/components/bucket/bucket.component";

export default function BucketsComponent(): ReactNode {
  const t = useTranslations("InspectionsPage");

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
      <BucketComponent
        title={t("withoutHistory")}
        items={data.withoutHistory}
      />
      <BucketComponent title={t("overdue")} items={data.overdue} />
      <BucketComponent title={t("today")} items={data.today} />
      <BucketComponent title={t("next7Days")} items={data.next7Days} />
      <BucketComponent title={t("next30Days")} items={data.next30Days} />
    </div>
  );
}
