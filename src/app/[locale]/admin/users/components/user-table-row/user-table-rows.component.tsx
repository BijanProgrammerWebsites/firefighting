import { ReactNode, use } from "react";

import { useTranslations } from "next-intl";

import { Select, Table } from "@mantine/core";

import { RefineryUserContext } from "@/admin/users/contexts/refinery-user-context";
import { AccessLevelType } from "@/admin/users/types/access-level.type";
import { UserType } from "@/admin/users/types/user.type";

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
    <Table.Tr key={user.username}>
      <Table.Td>{user.username}</Table.Td>
      <Table.Td>{user.password}</Table.Td>

      <Table.Td>
        <Select
          defaultValue={user.role}
          data={[
            { value: "manager", label: t("manager") },
            { value: "inspector", label: t("inspector") },
            { value: "viewer", label: t("viewer") },
          ]}
          onChange={(e) => handleChangeAccessLevel(user.id, e)}
        />
      </Table.Td>
    </Table.Tr>
  ));
}
