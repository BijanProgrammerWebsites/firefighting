import { ReactNode, use } from "react";

import { useTranslations } from "next-intl";

import { Select, Table } from "@mantine/core";

import { AccessLevelType } from "@/admin/users/components/types/access-level.type";
import { UserType } from "@/admin/users/components/types/user.type";
import { RefineryUserContext } from "@/admin/users/contexts/refinery-user-context";

type Props = {
  users: UserType[];
};
export default function UserTableRowsComponent({ users }: Props): ReactNode {
  const { updateUserAccessLevel } = use(RefineryUserContext);
  const t = useTranslations("AdminUsersPage");
  const handleChangeAccessLevel = (id: number, e: string | null): void => {
    if (e) {
      updateUserAccessLevel(id.toString(), e as AccessLevelType);
    }
  };
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
          onChange={(e) => handleChangeAccessLevel(user.id, e)}
        />
      </Table.Td>
    </Table.Tr>
  ));
}
