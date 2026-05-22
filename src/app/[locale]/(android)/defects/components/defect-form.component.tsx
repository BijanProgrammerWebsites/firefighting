"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Select, Stack, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";

import { zod4Resolver } from "mantine-form-zod-resolver";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import {
  CreateDefectRequestDto,
  CreateDefectSchema,
  editDefectApi,
} from "@/api/defects/edit-defect.api";

import SubmitButtonComponent from "@/components/submit-button.component";

import { DefectSeverityEnum } from "@/enums/defect-severity.enum";
import { DefectStatusEnum } from "@/enums/defect-status.enum";
import { MaintenanceStatusEnum } from "@/enums/maintenance-status.enum";

import { defectKeys } from "@/queries/keys";

type Props = {
  id: string;
  initialValues: CreateDefectRequestDto;
};

export default function DefectFormComponent({
  id,
  initialValues,
}: Props): ReactNode {
  const tCommon = useTranslations("Common");
  const t = useTranslations("DefectsPage");

  const queryClient = useQueryClient();

  const { mutateAsync: editMutateAsync } = useMutation({
    mutationKey: defectKeys.edit,
    mutationFn: editDefectApi,
  });

  const form = useForm<CreateDefectRequestDto>({
    initialValues,
    validate: zod4Resolver(CreateDefectSchema),
  });

  const handleFormSubmit = async (
    dto: CreateDefectRequestDto,
  ): Promise<void> => {
    await editMutateAsync(
      { id, ...dto },
      {
        onSuccess: async (data): Promise<void> => {
          toast.success(data.message);
          await queryClient.invalidateQueries({ queryKey: defectKeys.all });
        },
        onError: (error): void => {
          toast.error(error.message);
        },
      },
    );
  };

  const severities = [
    { value: DefectSeverityEnum.LOW, label: tCommon("low") },
    { value: DefectSeverityEnum.MEDIUM, label: tCommon("medium") },
    { value: DefectSeverityEnum.HIGH, label: tCommon("high") },
    { value: DefectSeverityEnum.CRITICAL, label: tCommon("critical") },
  ];

  const statuses = [
    { value: DefectStatusEnum.OPEN, label: tCommon("open") },
    { value: DefectStatusEnum.IN_PROGRESS, label: tCommon("inProgress") },
    {
      value: DefectStatusEnum.WAITING_FOR_SPARE_PART,
      label: tCommon("waitingForSparePart"),
    },
    { value: DefectStatusEnum.CLOSED, label: tCommon("closed") },
  ];

  const maintenanceStatuses = [
    { value: MaintenanceStatusEnum.NOT_STARTED, label: tCommon("notStarted") },
    { value: MaintenanceStatusEnum.ASSIGNED, label: tCommon("assigned") },
    { value: MaintenanceStatusEnum.IN_PROGRESS, label: tCommon("inProgress") },
    {
      value: MaintenanceStatusEnum.WAITING_FOR_SPARE_PART,
      label: tCommon("waitingForSparePart"),
    },
    { value: MaintenanceStatusEnum.COMPLETED, label: tCommon("completed") },
    { value: MaintenanceStatusEnum.VERIFIED, label: tCommon("verified") },
  ];

  return (
    <form onSubmit={form.onSubmit(handleFormSubmit)}>
      <Stack>
        <TextInput label={tCommon("title")} {...form.getInputProps("title")} />
        <Textarea
          label={tCommon("description")}
          mt="xs"
          {...form.getInputProps("description")}
        />
        <Select
          withAsterisk
          searchable
          withAlignedLabels
          label={tCommon("severity")}
          data={severities}
          {...form.getInputProps("severity")}
        />
        <Select
          withAsterisk
          searchable
          withAlignedLabels
          label={tCommon("status")}
          data={statuses}
          {...form.getInputProps("status")}
        />
        <Select
          withAsterisk
          searchable
          withAlignedLabels
          label={tCommon("maintenanceStatus")}
          data={maintenanceStatuses}
          {...form.getInputProps("maintenanceStatus")}
        />
        <SubmitButtonComponent />
      </Stack>
    </form>
  );
}
