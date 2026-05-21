"use client";

import { ReactNode } from "react";

import { Text } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

import { findOneDefectApi } from "@/api/defects/find-one-defect.api";

import LoadingComponent from "@/components/loading/loading.component";

import { defectKeys } from "@/queries/keys";

import DefectFormComponent from "@/android/defects/components/defect-form/defect-form.component";

type Props = {
  id: string;
};

export default function DefectEditComponent({ id }: Props): ReactNode {
  const { isPending, isError, error, data } = useQuery({
    queryKey: defectKeys.one(id),
    queryFn: () => findOneDefectApi(id),
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <Text c="red">{error.message}</Text>;
  }

  return (
    <DefectFormComponent
      id={id}
      initialValues={{
        title: data.title,
        description: data.description,
        severity: data.severity,
        status: data.status,
        maintenanceStatus: data.maintenanceStatus,
      }}
    />
  );
}
