"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Text } from "@mantine/core";
import { useForm } from "@mantine/form";

import { zod4Resolver } from "mantine-form-zod-resolver";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { ListViewTable } from "@gfazioli/mantine-list-view-table";

import { findAllUsersApi } from "@/api/users/find-all-users.api";
import { removeUserApi } from "@/api/users/remove-user.api";

import EditButtonComponent from "@/components/edit-button.component";
import LoadingComponent from "@/components/loading.component";
import RemoveButtonComponent from "@/components/remove-button.component";

import { TableConstants } from "@/constants/table.constants";

import { RoleEnum } from "@/enums/role.enum";

import { z } from "@/lib/zod";

import { userKeys } from "@/queries/keys";

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
    <ListViewTable
      striped
      highlightOnHover
      enableColumnResizing
      enableColumnVisibilityToggle
      withColumnBorders={true}
      withRowBorders={false}
      data={filteredData}
      rowKey="id"
      columns={[
        {
          key: "id",
          title: tCommon("row"),
          sortable: true,
          width: TableConstants.ROW_COLUMN_WIDTH,
          renderCell: (_, index) => index + 1,
        },
        {
          key: "username",
          title: t("username"),
          sortable: true,
          // filter: (
          //   <TextInput
          //     {...TEXT_FILTER_PROPS}
          //     {...form.getInputProps("username")}
          //   />
          // ),
        },
        {
          key: "role",
          title: t("role"),
          sortable: true,
          // filter: (
          //   <Select
          //     data={roles}
          //     {...SELECT_FILTER_PROPS}
          //     {...form.getInputProps("role")}
          //   />
          // ),
        },
        {
          key: "",
          width: TableConstants.ACTIONS_COLUMN_WIDTH(3),
          textAlign: "center",
          renderCell: (item) => (
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
