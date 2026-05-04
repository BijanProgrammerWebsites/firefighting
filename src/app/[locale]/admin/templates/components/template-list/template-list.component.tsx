"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { NumberInput, Select, Table, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { zod4Resolver } from "mantine-form-zod-resolver";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

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
  ROW_COLUMN_PROPS,
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

  const rows = filteredData.map((item, index) => (
    <Table.Tr key={item.id}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{item.title}</Table.Td>
      <Table.Td>{item.description}</Table.Td>
      <Table.Td>{item.standard.title}</Table.Td>
      <Table.Td>{item.inspectionPeriod} روز</Table.Td>
      <Table.Td>
        <EditButtonComponent href={`/admin/templates/${item.id}`} />
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
          <Table.Th>
            {t("description")}
            <TextInput
              {...TEXT_FILTER_PROPS}
              {...form.getInputProps("description")}
            />
          </Table.Th>
          <Table.Th>
            {t("inspectionStandard")}
            <Select
              data={standardOptions}
              {...SELECT_FILTER_PROPS}
              {...form.getInputProps("standardId")}
            />
          </Table.Th>
          <Table.Th>
            {t("inspectionPeriod")}
            <NumberInput
              min={1}
              allowNegative={false}
              allowDecimal={false}
              {...NUMBER_FILTER_PROPS}
              {...form.getInputProps("inspectionPeriod")}
            />
          </Table.Th>
          <Table.Th w={TableConstants.ACTIONS_COLUMN_WIDTH(2)} />
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
