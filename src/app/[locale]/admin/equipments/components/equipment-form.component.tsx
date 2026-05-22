"use client";

import type { ReactNode } from "react";

import { useRouter } from "next/navigation";

import { useTranslations } from "next-intl";

import { Select, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { zod4Resolver } from "mantine-form-zod-resolver";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import {
  CreateEquipmentRequestDto,
  CreateEquipmentSchema,
  createEquipmentApi,
} from "@/api/equipments/create-equipment.api";
import { editEquipmentApi } from "@/api/equipments/edit-equipment.api";
import { findAllSitesApi } from "@/api/sites/find-all-sites.api";
import { findOneSiteApi } from "@/api/sites/find-one-site.api";
import { findAllTemplatesApi } from "@/api/templates/find-all-templates.api";
import { findOneZoneApi } from "@/api/zones/find-one-zone.api";

import LoadingComponent from "@/components/loading.component";
import SubmitButtonComponent from "@/components/submit-button.component";

import {
  equipmentKeys,
  siteKeys,
  templateKeys,
  zoneKeys,
} from "@/queries/keys";

type Props =
  | {
      id?: never;
      initialValues?: never;
    }
  | {
      id: string;
      initialValues: CreateEquipmentRequestDto;
    };

export default function EquipmentFormComponent({
  id,
  initialValues,
}: Props): ReactNode {
  const tCommon = useTranslations("Common");
  const t = useTranslations("AdminEquipmentsPage");

  const router = useRouter();

  const queryClient = useQueryClient();

  const templatesQuery = useQuery({
    queryKey: templateKeys.all,
    queryFn: findAllTemplatesApi,
  });

  const { mutateAsync: createMutateAsync } = useMutation({
    mutationKey: equipmentKeys.create,
    mutationFn: createEquipmentApi,
  });

  const { mutateAsync: editMutateAsync } = useMutation({
    mutationKey: equipmentKeys.edit,
    mutationFn: editEquipmentApi,
  });

  const form = useForm<CreateEquipmentRequestDto>({
    initialValues: initialValues ?? {
      title: "",
      templateId: "",
      siteId: "",
      zoneId: "",
      unitId: "",
    },
    validate: zod4Resolver(CreateEquipmentSchema),
  });

  const allSitesQuery = useQuery({
    queryKey: siteKeys.all,
    queryFn: findAllSitesApi,
  });

  const selectedSiteQuery = useQuery({
    queryKey: siteKeys.one(form.values.siteId),
    queryFn: () => findOneSiteApi(form.values.siteId),
  });

  const selectedZoneQuery = useQuery({
    queryKey: zoneKeys.one(form.values.zoneId),
    queryFn: () => findOneZoneApi(form.values.zoneId),
  });

  const handleFormSubmit = async (
    dto: CreateEquipmentRequestDto,
  ): Promise<void> => {
    if (id) {
      await editMutateAsync(
        { id, ...dto },
        {
          onSuccess: async (data): Promise<void> => {
            toast.success(data.message);
            await queryClient.invalidateQueries({
              queryKey: equipmentKeys.all,
            });
          },
          onError: (error): void => {
            toast.error(error.message);
          },
        },
      );
    } else {
      await createMutateAsync(dto, {
        onSuccess: async (data): Promise<void> => {
          toast.success(data.message);
          await queryClient.invalidateQueries({ queryKey: equipmentKeys.all });
          router.push("/admin/equipments");
        },
        onError: (error): void => {
          toast.error(error.message);
        },
      });
    }
  };

  if (
    templatesQuery.isPending ||
    allSitesQuery.isPending ||
    selectedSiteQuery.isPending ||
    selectedZoneQuery.isPending
  ) {
    return <LoadingComponent />;
  }

  if (
    templatesQuery.isError ||
    allSitesQuery.isError ||
    selectedSiteQuery.isError ||
    selectedZoneQuery.isError
  ) {
    return (
      <Stack>
        {[
          templatesQuery,
          allSitesQuery,
          selectedSiteQuery,
          selectedZoneQuery,
        ].map((query, index) =>
          query.isError ? (
            <Text key={index} c="red">
              {query.error.message}
            </Text>
          ) : null,
        )}
      </Stack>
    );
  }

  const templates = templatesQuery.data.map((item) => ({
    value: item.id,
    label: item.title,
  }));

  const sites = allSitesQuery.data.map((item) => ({
    value: item.id,
    label: item.title,
  }));

  const zones = selectedSiteQuery.data.zones?.map((item) => ({
    value: item.id,
    label: item.title,
  }));

  const units = selectedZoneQuery.data.units?.map((item) => ({
    value: item.id,
    label: item.title,
  }));

  return (
    <form
      style={{ maxWidth: "30rem" }}
      onSubmit={form.onSubmit(handleFormSubmit)}
    >
      <Stack>
        <TextInput
          withAsterisk
          label={tCommon("title")}
          {...form.getInputProps("title")}
        />
        <Select
          withAsterisk
          searchable
          withAlignedLabels
          label={tCommon("template")}
          data={templates}
          {...form.getInputProps("templateId")}
        />
        <Select
          withAsterisk
          searchable
          withAlignedLabels
          label={tCommon("site")}
          data={sites}
          {...form.getInputProps("siteId")}
        />
        <Select
          withAsterisk
          searchable
          withAlignedLabels
          label={tCommon("zone")}
          data={zones}
          disabled={!form.values.siteId}
          {...form.getInputProps("zoneId")}
        />
        <Select
          withAsterisk
          searchable
          withAlignedLabels
          label={tCommon("unit")}
          data={units}
          disabled={!form.values.zoneId}
          {...form.getInputProps("unitId")}
        />
        <SubmitButtonComponent />
      </Stack>
    </form>
  );
}
