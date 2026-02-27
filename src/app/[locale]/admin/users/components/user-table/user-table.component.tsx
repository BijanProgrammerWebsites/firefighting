"use client";
import { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Alert, Center, Loader, Table } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

import { findAllUsersApi } from "@/api/user/find-all-users.api";

import LoadingComponent from "@/components/loading/loading.component";

import { userKeys } from "@/queries/keys";

import UserTableRowsComponent from "@/admin/users/components/user-table-row/user-table-rows.component";

import styles from "./user-table.module.css";

export default function UserTableComponent(): ReactNode {
  const t = useTranslations("AdminUsersPage");

  const { data, error, isFetching, isPending } = useQuery({
    queryKey: userKeys.all,
    queryFn: findAllUsersApi,
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (error) {
    return (
      <Alert title={t("errorTitle")} color="red" variant="filled">
        {error.message}
      </Alert>
    );
  }

  return (
    <div className={styles["user-table"]}>
      <Table stickyHeader striped stickyHeaderOffset={60}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>{t("username")}</Table.Th>
            <Table.Th>{t("role")}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <UserTableRowsComponent users={data ?? []} />
        </Table.Tbody>
      </Table>

      {isFetching && !isPending && (
        <Center style={{ marginTop: 16 }}>
          <Loader size="sm" />
        </Center>
      )}
    </div>
  );
}
