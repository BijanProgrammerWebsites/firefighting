"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Select, Table, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { zod4Resolver } from "mantine-form-zod-resolver";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { findAllUsersApi } from "@/api/users/find-all-users.api";
import { removeUserApi } from "@/api/users/remove-user.api";

import EditButtonComponent from "@/components/edit-button/edit-button.component";
import LoadingComponent from "@/components/loading/loading.component";
import RemoveButtonComponent from "@/components/remove-button/remove-button.component";

import { TableConstants } from "@/constants/table.constants";

import { RoleEnum } from "@/enums/role.enum";

import { z } from "@/lib/zod";

import { userKeys } from "@/queries/keys";

import {
  ROW_COLUMN_PROPS,
  SELECT_FILTER_PROPS,
  TEXT_FILTER_PROPS,
} from "@/utils/component.utils";
import { filterByText } from "@/utils/filter.utils";

export const UserListFiltersSchema = z.object({
  username: z.string(),
  role: z.enum(RoleEnum).or(z.literal("")),
});

export type UserListFiltersType = z.infer<typeof UserListFiltersSchema>;

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

  const form = useForm<UserListFiltersType>({
    initialValues: { username: "", role: "" },
    validate: zod4Resolver(UserListFiltersSchema),
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <Text c="red">{error.message}</Text>;
  }

  const roles = [
    { value: RoleEnum.ADMIN, label: t("admin") },
    { value: RoleEnum.INSPECTOR, label: t("inspector") },
    { value: RoleEnum.VIEWER, label: t("viewer") },
  ];

  const filteredData = data.filter(
    (item) =>
      filterByText(item.username, form.values.username) &&
      filterByText(item.role, form.values.role),
  );

  const rows = filteredData.map((item, index) => (
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
          <Table.Th w={TableConstants.ROW_COLUMN_WIDTH} {...ROW_COLUMN_PROPS}>
            {tCommon("row")}
          </Table.Th>
          <Table.Th>
            {t("username")}
            <TextInput
              {...TEXT_FILTER_PROPS}
              {...form.getInputProps("username")}
            />
          </Table.Th>
          <Table.Th>
            {t("role")}
            <Select
              data={roles}
              {...SELECT_FILTER_PROPS}
              {...form.getInputProps("role")}
            />
          </Table.Th>
          <Table.Th w={TableConstants.ACTIONS_COLUMN_WIDTH(2)} />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
