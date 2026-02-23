"use client";
import { ReactNode, use } from "react";

import { useTranslations } from "next-intl";

import { Table } from "@mantine/core";

import UserTableRowsComponent from "@/admin/users/components/user-table-row/user-table-rows.component";
import { RefineryUserContext } from "@/admin/users/contexts/refinery-user-context";

import styles from "./user-table.module.css";

export default function UserTableComponent(): ReactNode {
  const { users } = use(RefineryUserContext);
  const t = useTranslations("AdminUsersPage");
  return (
    <div className={styles["user-table"]}>
      <Table stickyHeader striped stickyHeaderOffset={60}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>{t("username")}</Table.Th>
            <Table.Th>{t("password")}</Table.Th>
            <Table.Th>{t("role")}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <UserTableRowsComponent users={users} />
        </Table.Tbody>
      </Table>
    </div>
  );
}
