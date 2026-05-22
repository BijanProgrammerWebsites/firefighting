"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Select, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { zod4Resolver } from "mantine-form-zod-resolver";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { DataTable } from "mantine-datatable";

import { findAllUsersApi } from "@/api/users/find-all-users.api";
import { removeUserApi } from "@/api/users/remove-user.api";

import EditButtonComponent from "@/components/edit-button.component";
import LoadingComponent from "@/components/loading.component";
import RemoveButtonComponent from "@/components/remove-button.component";

import { TableConstants } from "@/constants/table.constants";

import { RoleEnum } from "@/enums/role.enum";

import { z } from "@/lib/zod";

import { userKeys } from "@/queries/keys";

import {
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
      await queryClient.invalidateQueries({ queryKey: userKeys.all });
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

  return (
    <DataTable
      highlightOnHover
      records={filteredData}
      columns={[
        {
          accessor: "id",
          title: tCommon("row"),
          width: TableConstants.ROW_COLUMN_WIDTH,
          render: (_, index) => index + 1,
        },
        {
          accessor: "username",
          title: t("username"),
          filter: (
            <TextInput
              {...TEXT_FILTER_PROPS}
              {...form.getInputProps("username")}
            />
          ),
        },
        {
          accessor: "role",
          title: t("role"),
          filter: (
            <Select
              data={roles}
              {...SELECT_FILTER_PROPS}
              {...form.getInputProps("role")}
            />
          ),
        },
        {
          accessor: "",
          width: TableConstants.ACTIONS_COLUMN_WIDTH(3),
          render: (item) => (
            <>
              <EditButtonComponent href={`/admin/users/${item.id}`} />
              <RemoveButtonComponent
                itemTitle={item.username}
                onConfirm={() => mutateAsync(item.id)}
              />
            </>
          ),
        },
      ]}
    />
  );
}
