"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { zod4Resolver } from "mantine-form-zod-resolver";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { DataTable } from "mantine-datatable";

import { findAllStandardsApi } from "@/api/standards/find-all-standards.api";
import { removeStandardApi } from "@/api/standards/remove-standard.api";

import EditButtonComponent from "@/components/edit-button.component";
import LoadingComponent from "@/components/loading.component";
import RemoveButtonComponent from "@/components/remove-button.component";

import { TableConstants } from "@/constants/table.constants";

import { z } from "@/lib/zod";

import { standardKeys } from "@/queries/keys";

import { TEXT_FILTER_PROPS } from "@/utils/component.utils";
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
      await queryClient.invalidateQueries({ queryKey: standardKeys.all });
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

  return (
    <DataTable
      highlightOnHover
      records={filteredData}
      columns={[
        {
          accessor: "id",
          title: tCommon("row"),
          width: TableConstants.ROW_COLUMN_WIDTH,
          render: (_, index) => index + 1,
        },
        {
          accessor: "title",
          title: tCommon("title"),
          filter: (
            <TextInput
              {...TEXT_FILTER_PROPS}
              {...form.getInputProps("title")}
            />
          ),
        },
        {
          accessor: "",
          width: TableConstants.ACTIONS_COLUMN_WIDTH(3),
          render: (item) => (
            <>
              <EditButtonComponent href={`/admin/standards/${item.id}`} />
              <RemoveButtonComponent
                itemTitle={item.title}
                onConfirm={() => mutateAsync(item.id)}
              />
            </>
          ),
        },
      ]}
    />
  );
}
