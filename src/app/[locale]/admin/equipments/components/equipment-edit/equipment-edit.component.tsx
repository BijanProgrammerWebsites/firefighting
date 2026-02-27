"use client";

import { ReactNode } from "react";

import { Text } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

import { findOneEquipmentApi } from "@/api/equipments/find-one-equipment.api";

import LoadingComponent from "@/components/loading/loading.component";

import { equipmentKeys } from "@/queries/keys";

import EquipmentFormComponent from "@/admin/equipments/components/equipment-form/equipment-form.component";

type Props = {
  id: string;
};

export default function EquipmentEditComponent({ id }: Props): ReactNode {
  const { isPending, isError, error, data } = useQuery({
    queryKey: equipmentKeys.one(id),
    queryFn: () => findOneEquipmentApi(id),
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <Text c="red">{error.message}</Text>;
  }

  return <EquipmentFormComponent id={id} initialValues={data} />;
}
