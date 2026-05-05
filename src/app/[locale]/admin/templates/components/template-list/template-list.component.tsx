"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { NumberInput, Select, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { zod4Resolver } from "mantine-form-zod-resolver";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { DataTable } from "mantine-datatable";

import { findAllStandardsApi } from "@/api/standards/find-all-standards.api";
import { findAllTemplatesApi } from "@/api/templates/find-all-templates.api";
import { removeTemplateApi } from "@/api/templates/remove-template.api";

import EditButtonComponent from "@/components/edit-button/edit-button.component";
import LoadingComponent from "@/components/loading/loading.component";
import RemoveButtonComponent from "@/components/remove-button/remove-button.component";

import { TableConstants } from "@/constants/table.constants";

import { z } from "@/lib/zod";

import { standardKeys, templateKeys } from "@/queries/keys";

import {
  NUMBER_FILTER_PROPS,
  SELECT_FILTER_PROPS,
  TEXT_FILTER_PROPS,
} from "@/utils/component.utils";
import { filterByNumber, filterByText } from "@/utils/filter.utils";

export const TemplateListFiltersSchema = z.object({
  title: z.string(),
  description: z.string(),
  standardId: z.uuid(),
  inspectionPeriod: z.int().positive().or(z.literal("")),
});

export type TemplateListFiltersType = z.infer<typeof TemplateListFiltersSchema>;

export default function TemplateListComponent(): ReactNode {
  const tCommon = useTranslations("Common");
  const t = useTranslations("AdminTemplatesPage");

  const queryClient = useQueryClient();

  const standards = useQuery({
    queryKey: standardKeys.all,
    queryFn: findAllStandardsApi,
  });

  const { isPending, isError, error, data } = useQuery({
    queryKey: templateKeys.all,
    queryFn: findAllTemplatesApi,
  });

  const { mutateAsync } = useMutation({
    mutationKey: templateKeys.remove,
    mutationFn: removeTemplateApi,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (result) => {
      queryClient.removeQueries({ queryKey: templateKeys.all });
      toast.success(result.message);
    },
  });

  const form = useForm<TemplateListFiltersType>({
    initialValues: {
      title: "",
      description: "",
      standardId: "",
      inspectionPeriod: "",
    },
    validate: zod4Resolver(TemplateListFiltersSchema),
  });

  if (standards.isPending || isPending) {
    return <LoadingComponent />;
  }

  if (standards.isError || isError) {
    return <Text c="red">{standards.error?.message ?? error?.message}</Text>;
  }

  const standardOptions = standards.data.map((item) => ({
    value: item.id,
    label: item.title,
  }));

  const filteredData = data.filter(
    (item) =>
      filterByText(item.title, form.values.title) &&
      filterByText(item.description, form.values.description) &&
      filterByText(item.standard.id, form.values.standardId) &&
      filterByNumber(item.inspectionPeriod, form.values.inspectionPeriod),
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
          accessor: "description",
          title: t("description"),
          filter: (
            <TextInput
              {...TEXT_FILTER_PROPS}
              {...form.getInputProps("description")}
            />
          ),
        },
        {
          accessor: "standard.title",
          title: t("inspectionStandard"),
          filter: (
            <Select
              data={standardOptions}
              {...SELECT_FILTER_PROPS}
              {...form.getInputProps("standardId")}
            />
          ),
        },
        {
          accessor: "inspectionPeriod",
          title: t("inspectionPeriod"),
          render: (item) => item.inspectionPeriod + " روز",
          filter: (
            <NumberInput
              min={1}
              allowNegative={false}
              allowDecimal={false}
              {...NUMBER_FILTER_PROPS}
              {...form.getInputProps("inspectionPeriod")}
            />
          ),
        },
        {
          accessor: "",
          width: TableConstants.ACTIONS_COLUMN_WIDTH(3),
          render: (item) => (
            <>
              <EditButtonComponent href={`/admin/templates/${item.id}`} />
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
