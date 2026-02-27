"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Table, Text } from "@mantine/core";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { TableConstants } from "@/constants/table.constants";

import { findAllEquipmentsApi } from "@/api/equipments/find-all-equipments.api";
import { removeEquipmentApi } from "@/api/equipments/remove-equipment.api";

import EditButtonComponent from "@/components/edit-button/edit-button.component";
import LoadingComponent from "@/components/loading/loading.component";
import RemoveButtonComponent from "@/components/remove-button/remove-button.component";

import { equipmentKeys } from "@/queries/keys";

export default function EquipmentListComponent(): ReactNode {
  const tCommon = useTranslations("Common");
  const t = useTranslations("AdminEquipmentsPage");

  const queryClient = useQueryClient();

  const { isPending, isError, error, data } = useQuery({
    queryKey: equipmentKeys.all,
    queryFn: findAllEquipmentsApi,
  });

  const { mutateAsync } = useMutation({
    mutationKey: equipmentKeys.remove,
    mutationFn: removeEquipmentApi,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (result) => {
      queryClient.removeQueries({ queryKey: equipmentKeys.all });
      toast.success(result.message);
    },
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <Text c="red">{error.message}</Text>;
  }

  const rows = data.map((item, index) => (
    <Table.Tr key={item.id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{item.title}</Table.Td>
      <Table.Td>{item.description}</Table.Td>
      <Table.Td>{item.standard.title}</Table.Td>
      <Table.Td>{item.inspectionPeriod} روز</Table.Td>
      <Table.Td>
        <EditButtonComponent href={`/admin/equipments/${item.id}`} />
        <RemoveButtonComponent
          itemTitle={item.title}
          onConfirm={() => mutateAsync(item.id)}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th w={TableConstants.ROW_COLUMN_WIDTH}>
            {tCommon("row")}
          </Table.Th>
          <Table.Th>{tCommon("title")}</Table.Th>
          <Table.Th>{t("description")}</Table.Th>
          <Table.Th>{t("inspectionStandard")}</Table.Th>
          <Table.Th>{t("inspectionPeriod")}</Table.Th>
          <Table.Th w={TableConstants.ACTIONS_COLUMN_WIDTH(2)} />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
