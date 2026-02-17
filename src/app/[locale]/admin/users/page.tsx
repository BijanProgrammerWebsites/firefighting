"use client";
import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Table } from "@mantine/core";

import UserTableRowsComponent from "@/admin/users/components/user-table-row/user-table-rows.component";
import { EMPLOYEE_MOCK_DATA } from "@/admin/users/mock/user.mock";
import RefineryUserProvider from "@/admin/users/providers/refinery-user-provider";

import styles from "./page.module.css";

export default function UsersPage(): ReactNode {
  const t = useTranslations("AdminUsersPage");

  return (
    <RefineryUserProvider>
      <Table stickyHeader stickyHeaderOffset={60}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>{t("firstName")}</Table.Th>
            <Table.Th>{t("lastName")}</Table.Th>
            <Table.Th>{t("position")}</Table.Th>
            <Table.Th>{t("email")}</Table.Th>
            <Table.Th>{t("phone")}</Table.Th>
            <Table.Th>{t("department")}</Table.Th>
            <Table.Th>{t("accessLevel")}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <UserTableRowsComponent users={EMPLOYEE_MOCK_DATA} />
        </Table.Tbody>
      </Table>
    </RefineryUserProvider>
  );
}
