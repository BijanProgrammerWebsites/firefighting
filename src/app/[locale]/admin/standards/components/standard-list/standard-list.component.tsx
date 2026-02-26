"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Table, Text } from "@mantine/core";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { TableConstants } from "@/constants/table.constants";

import { findAllStandardsApi } from "@/api/standards/find-all-standards.api";
import { removeStandardApi } from "@/api/standards/remove-standard.api";

import EditButtonComponent from "@/components/edit-button/edit-button.component";
import LoadingComponent from "@/components/loading/loading.component";
import RemoveButtonComponent from "@/components/remove-button/remove-button.component";

import { standardKeys } from "@/queries/keys";

export default function StandardListComponent(): ReactNode {
  const t = useTranslations("Common");

  const queryClient = useQueryClient();

  const { isPending, isError, error, data } = useQuery({
    queryKey: standardKeys.all,
    queryFn: findAllStandardsApi,
  });

  const { mutateAsync } = useMutation({
    mutationKey: standardKeys.remove,
    mutationFn: removeStandardApi,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (result) => {
      queryClient.removeQueries({ queryKey: standardKeys.all });
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
      <Table.Td>
        <EditButtonComponent href={`/admin/standards/${item.id}`} />
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
          <Table.Th w={TableConstants.ROW_COLUMN_WIDTH}>{t("row")}</Table.Th>
          <Table.Th>{t("title")}</Table.Th>
          <Table.Th w={TableConstants.ACTIONS_COLUMN_WIDTH(2)} />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
