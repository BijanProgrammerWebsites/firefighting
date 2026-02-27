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

import { FindOneEquipmentResponseDto } from "@/api/equipments/find-one-equipment.api";
import {
  CreateInspectionRequestDto,
  CreateInspectionSchema,
  createInspectionApi,
} from "@/api/inspections/create-inspection.api";
import { editInspectionApi } from "@/api/inspections/edit-inspection.api";
import { findAllStandardsApi } from "@/api/standards/find-all-standards.api";

import LoadingComponent from "@/components/loading/loading.component";

import { inspectionKeys, standardKeys } from "@/queries/keys";

import styles from "./inspection-form.module.css";

type Props = {
  equipment: FindOneEquipmentResponseDto;
} & (
  | {
      id?: never;
      initialValues?: never;
    }
  | {
      id: string;
      initialValues: CreateInspectionRequestDto;
    }
);

export default function InspectionFormComponent({
  equipment,
  id,
  initialValues,
}: Props): ReactNode {
  const tCommon = useTranslations("Common");
  const t = useTranslations("InspectionsPage");

  const router = useRouter();

  const queryClient = useQueryClient();

  const { isPending, isError, error, data } = useQuery({
    queryKey: standardKeys.all,
    queryFn: findAllStandardsApi,
  });

  const { mutateAsync: createMutateAsync } = useMutation({
    mutationKey: inspectionKeys.create,
    mutationFn: createInspectionApi,
  });

  const { mutateAsync: editMutateAsync } = useMutation({
    mutationKey: inspectionKeys.edit,
    mutationFn: editInspectionApi,
  });

  const form = useForm<CreateInspectionRequestDto>({
    initialValues: initialValues ?? {
      title: "",
      description: "",
      inspectionPeriod: 30,
      standardId: "",
    },
    validate: zod4Resolver(CreateInspectionSchema),
  });

  const handleFormSubmit = async (
    dto: CreateInspectionRequestDto,
  ): Promise<void> => {
    console.log(dto);

    if (id) {
      await editMutateAsync(
        { id, ...dto },
        {
          onSuccess: (data): void => {
            toast.success(data.message);
            queryClient.removeQueries({ queryKey: inspectionKeys.all });
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
          queryClient.removeQueries({ queryKey: inspectionKeys.all });
          router.push("/admin/inspections");
        },
        onError: (error): void => {
          toast.error(error.message);
        },
      });
    }
  };

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <Text c="red">{error.message}</Text>;
  }

  const standards = data.map((item) => ({
    value: item.id,
    label: item.title,
  }));

  return (
    <form
      className={styles["inspection-form"]}
      onSubmit={form.onSubmit(handleFormSubmit)}
    >
      <Stack>
        <TextInput
          withAsterisk
          label={t("titleField")}
          {...form.getInputProps("title")}
        />
        <TextInput
          withAsterisk
          label={t("description")}
          {...form.getInputProps("description")}
        />
        <Select
          withAsterisk
          searchable
          withAlignedLabels
          label={t("inspectionStandard")}
          data={standards}
          {...form.getInputProps("standardId")}
        />
        <NumberInput
          withAsterisk
          label={t("inspectionPeriod")}
          min={1}
          allowNegative={false}
          allowDecimal={false}
          suffix={" " + tCommon("days")}
          {...form.getInputProps("inspectionPeriod")}
        />
        <Button type="submit" w="max-content">
          {t("submit")}
        </Button>
      </Stack>
    </form>
  );
}
