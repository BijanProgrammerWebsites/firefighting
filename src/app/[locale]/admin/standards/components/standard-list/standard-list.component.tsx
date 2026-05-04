"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Table, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { zod4Resolver } from "mantine-form-zod-resolver";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { findAllStandardsApi } from "@/api/standards/find-all-standards.api";
import { removeStandardApi } from "@/api/standards/remove-standard.api";

import EditButtonComponent from "@/components/edit-button/edit-button.component";
import LoadingComponent from "@/components/loading/loading.component";
import RemoveButtonComponent from "@/components/remove-button/remove-button.component";

import { TableConstants } from "@/constants/table.constants";

import { z } from "@/lib/zod";

import { standardKeys } from "@/queries/keys";

import { ROW_COLUMN_PROPS, TEXT_FILTER_PROPS } from "@/utils/component.utils";
import { filterByText } from "@/utils/filter.utils";

export const StandardListFiltersSchema = z.object({
  title: z.string(),
});

export type StandardListFiltersType = z.infer<typeof StandardListFiltersSchema>;

export default function StandardListComponent(): ReactNode {
  const tCommon = useTranslations("Common");

  const queryClient = useQueryClient();

  const { isPending, isError, error, data } = useQuery({
    queryKey: standardKeys.all,
    queryFn: findAllStandardsApi,
  });

  const { mutateAsync } = useMutation({
    mutationKey: standardKeys.remove,
    mutationFn: removeStandardApi,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (result) => {
      queryClient.removeQueries({ queryKey: standardKeys.all });
      toast.success(result.message);
    },
  });

  const form = useForm<StandardListFiltersType>({
    initialValues: { title: "" },
    validate: zod4Resolver(StandardListFiltersSchema),
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <Text c="red">{error.message}</Text>;
  }

  const filteredData = data.filter((item) =>
    filterByText(item.title, form.values.title),
  );

  const rows = filteredData.map((item, index) => (
    <Table.Tr key={item.id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{item.title}</Table.Td>
      <Table.Td>
        <EditButtonComponent href={`/admin/standards/${item.id}`} />
        <RemoveButtonComponent
          itemTitle={item.title}
          onConfirm={() => mutateAsync(item.id)}
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th w={TableConstants.ROW_COLUMN_WIDTH} {...ROW_COLUMN_PROPS}>
            {tCommon("row")}
          </Table.Th>
          <Table.Th>
            {tCommon("title")}
            <TextInput
              {...TEXT_FILTER_PROPS}
              {...form.getInputProps("title")}
            />
          </Table.Th>
          <Table.Th w={TableConstants.ACTIONS_COLUMN_WIDTH(2)} />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
