"use client";

import { ReactNode } from "react";

import { Text } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

import { findOneEquipmentApi } from "@/api/equipments/find-one-equipment.api";

import LoadingComponent from "@/components/loading/loading.component";

import { equipmentKeys } from "@/queries/keys";

import InspectionFormComponent from "@/android/inspections/components/inspection-form/inspection-form.component";

type Props = {
  equipmentId: string;
};

export default function InspectionCreateComponent({
  equipmentId,
}: Props): ReactNode {
  const { isPending, isError, error, data } = useQuery({
    queryKey: equipmentKeys.one(equipmentId),
    queryFn: () => findOneEquipmentApi(equipmentId),
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <Text c="red">{error.message}</Text>;
  }

  return <InspectionFormComponent equipment={data} />;
}
