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

import { zod4Resolver } from "mantine-form-zod-resolver";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { findAllStandardsApi } from "@/api/standards/find-all-standards.api";
import {
  CreateTemplateRequestDto,
  CreateTemplateSchema,
  createTemplateApi,
} from "@/api/templates/create-template.api";
import { editTemplateApi } from "@/api/templates/edit-template.api";

import LoadingComponent from "@/components/loading/loading.component";

import { standardKeys, templateKeys } from "@/queries/keys";

type Props =
  | {
      id?: never;
      initialValues?: never;
    }
  | {
      id: string;
      initialValues: CreateTemplateRequestDto;
    };

export default function TemplateFormComponent({
  id,
  initialValues,
}: Props): ReactNode {
  const tCommon = useTranslations("Common");
  const t = useTranslations("AdminTemplatesPage");

  const router = useRouter();

  const queryClient = useQueryClient();

  const standards = useQuery({
    queryKey: standardKeys.all,
    queryFn: findAllStandardsApi,
  });

  const { mutateAsync: createMutateAsync } = useMutation({
    mutationKey: templateKeys.create,
    mutationFn: createTemplateApi,
  });

  const { mutateAsync: editMutateAsync } = useMutation({
    mutationKey: templateKeys.edit,
    mutationFn: editTemplateApi,
  });

  const form = useForm<CreateTemplateRequestDto>({
    initialValues: initialValues ?? {
      title: "",
      description: "",
      inspectionPeriod: 30,
      standardId: "",
    },
    validate: zod4Resolver(CreateTemplateSchema),
  });

  const handleFormSubmit = async (
    dto: CreateTemplateRequestDto,
  ): Promise<void> => {
    if (id) {
      await editMutateAsync(
        { id, ...dto },
        {
          onSuccess: (data): void => {
            toast.success(data.message);
            queryClient.removeQueries({ queryKey: templateKeys.all });
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
          queryClient.removeQueries({ queryKey: templateKeys.all });
          router.push("/admin/templates");
        },
        onError: (error): void => {
          toast.error(error.message);
        },
      });
    }
  };

  if (standards.isPending) {
    return <LoadingComponent />;
  }

  if (standards.isError) {
    return <Text c="red">{standards.error.message}</Text>;
  }

  const standardOptions = standards.data.map((item) => ({
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
          data={standardOptions}
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
