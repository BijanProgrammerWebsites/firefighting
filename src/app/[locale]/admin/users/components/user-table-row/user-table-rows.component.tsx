import { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Select, Table } from "@mantine/core";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { updateUser } from "@/api/user/update-user.api";

import { PasswordlessUser } from "@/entities/user";

import { mutationKeys, userKeys } from "@/queries/keys";

import { Role } from "@/types/role.type";

type Props = {
  users: PasswordlessUser[];
};
export default function UserTableRowsComponent({ users }: Props): ReactNode {
  const t = useTranslations("AdminUsersPage");

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationKey: mutationKeys.userUpdate(),
    mutationFn: updateUser,
  });

  const handleChangeRole = async (
    e: string | null,
    id: number,
  ): Promise<void> => {
    if (!e) {
      return;
    }
    await mutateAsync(
      { id: id, role: e as Role },
      {
        onError: (error): void => {
          toast.error(error.message);
        },
        onSuccess: (data): void => {
          toast.success(data.message);
          queryClient.removeQueries({ queryKey: userKeys.all });
        },
      },
    );
  };

  return users.map((user: PasswordlessUser) => (
    <Table.Tr key={user.username}>
      <Table.Td>{user.username}</Table.Td>
      <Table.Td>
        <Select
          defaultValue={user.role}
          data={[
            { value: "admin", label: t("manager") },
            { value: "inspector", label: t("inspector") },
            { value: "viewer", label: t("viewer") },
          ]}
          onChange={(e) => handleChangeRole(e, user.id)}
        />
      </Table.Td>
    </Table.Tr>
  ));
}
