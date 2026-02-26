"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { ActionIcon, Table, Text, Tooltip } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

import { findAllStandardsApi } from "@/api/standards/find-all-standards.api";

import IconComponent from "@/components/icon/icon.component";
import LoadingComponent from "@/components/loading/loading.component";

import { Link } from "@/i18n/navigation";

import { standardKeys } from "@/queries/keys";

export default function StandardListComponent(): ReactNode {
  const t = useTranslations("Common");

  const { isPending, isError, error, data } = useQuery({
    queryKey: standardKeys.all,
    queryFn: findAllStandardsApi,
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <Text c="red">{error.message}</Text>;
  }

  const rows = data.map((item, index) => (
    <Table.Tr key={item.id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{item.title}</Table.Td>
      <Table.Td>
        <Tooltip label={t("edit")}>
          <ActionIcon
            component={Link}
            href={`/standards/${item.id}`}
            variant="subtle"
            color="gray"
            aria-label={t("edit")}
          >
            <IconComponent name="pen-linear" />
          </ActionIcon>
        </Tooltip>
        <Tooltip label={t("remove")}>
          <ActionIcon
            variant="subtle"
            color="gray"
            aria-label={t("remove")}
            onClick={() => {}}
          >
            <IconComponent name="trash-bin-trash-linear" />
          </ActionIcon>
        </Tooltip>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th w={40 + 20}>{t("row")}</Table.Th>
          <Table.Th>{t("title")}</Table.Th>
          <Table.Th w={2 * 28 + 20}></Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
