"use client";

import type { ReactNode } from "react";

import { useRouter } from "next/navigation";

import { useTranslations } from "next-intl";

import {
  Button,
  Fieldset,
  SegmentedControl,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { StatusEnum } from "@/enums/status.enum";
import { zod4Resolver } from "mantine-form-zod-resolver";

import { FindOneEquipmentResponseDto } from "@/api/equipments/find-one-equipment.api";
import {
  CreateInspectionRequestDto,
  CreateInspectionSchema,
  createInspectionApi,
} from "@/api/inspections/create-inspection.api";
import { editInspectionApi } from "@/api/inspections/edit-inspection.api";

import { inspectionKeys } from "@/queries/keys";

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
      equipmentId: equipment.id,
      answers: equipment.template.standard.questions.map((question) => ({
        questionId: question.id,
        status: StatusEnum.OK,
        text: "",
        picture: null,
      })),
    },
    validate: zod4Resolver(CreateInspectionSchema),
  });

  const handleFormSubmit = async (
    dto: CreateInspectionRequestDto,
  ): Promise<void> => {
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
          router.push("/inspections");
        },
        onError: (error): void => {
          toast.error(error.message);
        },
      });
    }
  };

  return (
    <form
      className={styles["inspection-form"]}
      onSubmit={form.onSubmit(handleFormSubmit)}
    >
      <Stack>
        {equipment.template.standard.questions.map((question, index) => (
          <Fieldset key={index} legend={t("question", { n: index + 1 })}>
            <Text size="md" fw={500}>
              {question.title}
            </Text>
            <Text c="dimmed" size="sm" mb="sm">
              {question.description}
            </Text>
            <Text size="sm" fw={500}>
              {tCommon("status")}
            </Text>
            <SegmentedControl
              data={[
                { label: tCommon("ok"), value: StatusEnum.OK },
                { label: tCommon("warning"), value: StatusEnum.WARNING },
                { label: tCommon("error"), value: StatusEnum.ERROR },
              ]}
              {...form.getInputProps(`answers.${index}.status`)}
            />
            <Textarea
              label={tCommon("description")}
              mt="xs"
              {...form.getInputProps(`answers.${index}.text`)}
            />
          </Fieldset>
        ))}
        <Button type="submit" w="max-content">
          {t("submit")}
        </Button>
      </Stack>
    </form>
  );
}
