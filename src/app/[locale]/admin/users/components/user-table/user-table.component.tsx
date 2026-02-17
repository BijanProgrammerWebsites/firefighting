"use client";
import { ChangeEvent, ReactNode, use, useState } from "react";

import { useTranslations } from "next-intl";

import { Table, TextInput } from "@mantine/core";

import UserTableRowsComponent from "@/admin/users/components/user-table-row/user-table-rows.component";
import { RefineryUserContext } from "@/admin/users/contexts/refinery-user-context";

import styles from "./user-table.module.css";

export default function UserTableComponent(): ReactNode {
  const { users } = use(RefineryUserContext);
  const [searchText, setSearchText] = useState<string>("");
  const t = useTranslations("AdminUsersPage");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.target.value.trim());
  };
  return (
    <div className={styles["user-table"]}>
      <TextInput
        label="جستجوی کاربر"
        placeholder="جستجو در نام و نام خانوادگی"
        onChange={handleSearch}
      />
      <Table stickyHeader striped stickyHeaderOffset={60}>
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
          <UserTableRowsComponent
            users={users.filter(
              (user) =>
                user.firstName.includes(searchText) ||
                user.lastName.includes(searchText),
            )}
          />
        </Table.Tbody>
      </Table>
    </div>
  );
}
