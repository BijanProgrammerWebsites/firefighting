"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Select, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { zod4Resolver } from "mantine-form-zod-resolver";

import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "react-toastify";

import { DataTable } from "mantine-datatable";

import { findAllEquipmentsApi } from "@/api/equipments/find-all-equipments.api";
import { removeEquipmentApi } from "@/api/equipments/remove-equipment.api";
import { findAllSitesApi } from "@/api/sites/find-all-sites.api";
import { findAllTemplatesApi } from "@/api/templates/find-all-templates.api";
import { findAllUnitsApi } from "@/api/units/find-all-units.api";
import { findAllZonesApi } from "@/api/zones/find-all-zones.api";

import EditButtonComponent from "@/components/edit-button.component";
import LoadingComponent from "@/components/loading.component";
import RemoveButtonComponent from "@/components/remove-button.component";

import { TableConstants } from "@/constants/table.constants";

import { z } from "@/lib/zod";

import {
  equipmentKeys,
  siteKeys,
  templateKeys,
  unitKeys,
  zoneKeys,
} from "@/queries/keys";

import {
  SELECT_FILTER_PROPS,
  TEXT_FILTER_PROPS,
} from "@/utils/component.utils";
import { filterByText } from "@/utils/filter.utils";

export const EquipmentListFiltersSchema = z.object({
  title: z.string(),
  templateId: z.uuid().or(z.literal("")),
  siteId: z.uuid().or(z.literal("")),
  zoneId: z.uuid().or(z.literal("")),
  unitId: z.uuid().or(z.literal("")),
});

export type EquipmentListFiltersType = z.infer<
  typeof EquipmentListFiltersSchema
>;

export default function EquipmentListComponent(): ReactNode {
  const tCommon = useTranslations("Common");

  const queryClient = useQueryClient();

  const [templates, sites, zones, units] = useQueries({
    queries: [
      { queryKey: templateKeys.all, queryFn: findAllTemplatesApi },
      { queryKey: siteKeys.all, queryFn: findAllSitesApi },
      { queryKey: zoneKeys.all, queryFn: findAllZonesApi },
      { queryKey: unitKeys.all, queryFn: findAllUnitsApi },
    ],
  });

  const { isPending, isError, error, data } = useQuery({
    queryKey: equipmentKeys.all,
    queryFn: findAllEquipmentsApi,
  });

  const { mutateAsync } = useMutation({
    mutationKey: equipmentKeys.remove,
    mutationFn: removeEquipmentApi,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (result) => {
      toast.success(result.message);
      await queryClient.invalidateQueries({ queryKey: equipmentKeys.all });
    },
  });

  const form = useForm<EquipmentListFiltersType>({
    initialValues: {
      title: "",
      templateId: "",
      siteId: "",
      zoneId: "",
      unitId: "",
    },
    validate: zod4Resolver(EquipmentListFiltersSchema),
  });

  if (
    templates.isPending ||
    sites.isPending ||
    zones.isPending ||
    units.isPending ||
    isPending
  ) {
    return <LoadingComponent />;
  }

  if (
    templates.isError ||
    sites.isError ||
    zones.isError ||
    units.isError ||
    isError
  ) {
    return <Text c="red">{error?.message}</Text>;
  }

  const templateOptions = templates.data.map((item) => ({
    value: item.id,
    label: item.title,
  }));

  const siteOptions = sites.data.map((item) => ({
    value: item.id,
    label: item.title,
  }));

  const zoneOptions = zones.data.map((item) => ({
    value: item.id,
    label: item.title,
  }));

  const unitOptions = units.data.map((item) => ({
    value: item.id,
    label: item.title,
  }));

  const filteredData = data.filter(
    (item) =>
      filterByText(item.title, form.values.title) &&
      filterByText(item.template.id, form.values.templateId) &&
      filterByText(item.unit.zone.site.id, form.values.siteId) &&
      filterByText(item.unit.zone.id, form.values.zoneId) &&
      filterByText(item.unit.id, form.values.unitId),
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
          accessor: "template.id",
          title: tCommon("template"),
          render: (item) => item.template.title,
          filter: (
            <Select
              data={templateOptions}
              {...SELECT_FILTER_PROPS}
              {...form.getInputProps("templateId")}
            />
          ),
        },
        {
          accessor: "unit.zone.site.id",
          title: tCommon("site"),
          render: (item) => item.unit.zone.site.title,
          filter: (
            <Select
              data={siteOptions}
              {...SELECT_FILTER_PROPS}
              {...form.getInputProps("siteId")}
            />
          ),
        },
        {
          accessor: "unit.zone.id",
          title: tCommon("zone"),
          render: (item) => item.unit.zone.title,
          filter: (
            <Select
              data={zoneOptions}
              {...SELECT_FILTER_PROPS}
              {...form.getInputProps("zoneId")}
            />
          ),
        },
        {
          accessor: "unit.id",
          title: tCommon("unit"),
          render: (item) => item.unit.title,
          filter: (
            <Select
              data={unitOptions}
              {...SELECT_FILTER_PROPS}
              {...form.getInputProps("unitId")}
            />
          ),
        },
        {
          accessor: "",
          width: TableConstants.ACTIONS_COLUMN_WIDTH(3),
          render: (item) => (
            <>
              <EditButtonComponent href={`/admin/equipments/${item.id}`} />
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
