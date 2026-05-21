"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Text } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

import { findAllDefectApi } from "@/api/defects/find-all-defect.api";

import LoadingComponent from "@/components/loading/loading.component";

import { defectKeys } from "@/queries/keys";

import DefectCardComponent from "@/android/defects/components/defect-card/defect-card.component";

export default function DefectListComponent(): ReactNode {
  const t = useTranslations("DefectsPage");

  const { isPending, isError, error, data } = useQuery({
    queryKey: defectKeys.all,
    queryFn: findAllDefectApi,
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <Text c="red">{error.message}</Text>;
  }

  return (
    <div>
      {data.map((defect) => (
        <DefectCardComponent key={defect.id} defect={defect} />
      ))}
    </div>
  );
}
