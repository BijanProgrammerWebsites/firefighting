"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Table, Text } from "@mantine/core";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { TableConstants } from "@/constants/table.constants";

import { findAllUsersApi } from "@/api/users/find-all-users.api";
import { removeUserApi } from "@/api/users/remove-user.api";

import EditButtonComponent from "@/components/edit-button/edit-button.component";
import LoadingComponent from "@/components/loading/loading.component";
import RemoveButtonComponent from "@/components/remove-button/remove-button.component";

import { userKeys } from "@/queries/keys";

export default function UserListComponent(): ReactNode {
  const tCommon = useTranslations("Common");
  const t = useTranslations("AdminUsersPage");

  const queryClient = useQueryClient();

  const { isPending, isError, error, data } = useQuery({
    queryKey: userKeys.all,
    queryFn: findAllUsersApi,
  });

  const { mutateAsync } = useMutation({
    mutationKey: userKeys.remove,
    mutationFn: removeUserApi,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (result) => {
      queryClient.removeQueries({ queryKey: userKeys.all });
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
      <Table.Td>{item.username}</Table.Td>
      <Table.Td>{item.role}</Table.Td>
      <Table.Td>
        <EditButtonComponent href={`/admin/users/${item.id}`} />
        <RemoveButtonComponent
          itemTitle={item.username}
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
          <Table.Th>{t("username")}</Table.Th>
          <Table.Th>{t("role")}</Table.Th>
          <Table.Th w={TableConstants.ACTIONS_COLUMN_WIDTH(2)} />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
