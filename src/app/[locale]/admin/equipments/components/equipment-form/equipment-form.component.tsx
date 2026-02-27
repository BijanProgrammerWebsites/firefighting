"use client";

import type { ReactNode } from "react";

import { useRouter } from "next/navigation";

import { useTranslations } from "next-intl";

import {
  Button,
  NumberInput,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { zod4Resolver } from "mantine-form-zod-resolver";

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

import LoadingComponent from "@/components/loading/loading.component";

import {
  equipmentKeys,
  siteKeys,
  templateKeys,
  zoneKeys,
} from "@/queries/keys";

import styles from "./equipment-form.module.css";

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
    queryKey: siteKeys.one(form.getValues().siteId),
    queryFn: () => findOneSiteApi(form.getValues().siteId),
  });

  const selectedZoneQuery = useQuery({
    queryKey: zoneKeys.one(form.getValues().zoneId),
    queryFn: () => findOneZoneApi(form.getValues().zoneId),
  });

  const handleFormSubmit = async (
    dto: CreateEquipmentRequestDto,
  ): Promise<void> => {
    if (id) {
      await editMutateAsync(
        { id, ...dto },
        {
          onSuccess: (data): void => {
            toast.success(data.message);
            queryClient.removeQueries({ queryKey: equipmentKeys.all });
          },
          onError: (error): void => {
            toast.error(error.message);
          },
        },
      );
    } else {
      await createMutateAsync(dto, {
        onSuccess: (data): void => {
          toast.success(data.message);
          queryClient.removeQueries({ queryKey: equipmentKeys.all });
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
      className={styles["equipment-form"]}
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
          disabled={!form.getValues().siteId}
          {...form.getInputProps("zoneId")}
        />
        <Select
          withAsterisk
          searchable
          withAlignedLabels
          label={tCommon("unit")}
          data={units}
          disabled={!form.getValues().zoneId}
          {...form.getInputProps("unitId")}
        />
        <Button type="submit" w="max-content">
          {t("submit")}
        </Button>
      </Stack>
    </form>
  );
}
