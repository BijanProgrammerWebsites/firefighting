import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Select, Table } from "@mantine/core";

import { UserType } from "@/admin/users/components/types/user.type";

type Props = {
  users: UserType[];
};
export default function UserTableRowsComponent({ users }: Props): ReactNode {
  const t = useTranslations("AdminUsersPage");
  return users.map((user: UserType) => (
    <Table.Tr key={user.firstName}>
      <Table.Td>{user.firstName}</Table.Td>
      <Table.Td>{user.lastName}</Table.Td>
      <Table.Td>{user.position}</Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.phone}</Table.Td>
      <Table.Td>{user.department}</Table.Td>
      <Table.Td>
        <Select
          defaultValue={user.accessLevel}
          data={[
            { value: "manager", label: t("manager") },
            { value: "inspector", label: t("inspector") },
            { value: "ordinary", label: t("ordinary") },
          ]}
        />
      </Table.Td>
    </Table.Tr>
  ));
}
