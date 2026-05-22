"use client";

import type { ReactNode } from "react";

import { useRouter } from "next/navigation";

import { useTranslations } from "next-intl";

import {
  Button,
  Fieldset,
  SegmentedControl,
  Select,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { zod4Resolver } from "mantine-form-zod-resolver";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { FindOneEquipmentResponseDto } from "@/api/equipments/find-one-equipment.api";
import {
  CreateInspectionRequestDto,
  createInspectionApi,
} from "@/api/inspections/create-inspection.api";

import { DefectSeverityEnum } from "@/enums/defect-severity.enum";
import { EquipmentStatusEnum } from "@/enums/equipment-status.enum";

import { z } from "@/lib/zod";

import { inspectionKeys } from "@/queries/keys";

const FormSchema = z.object({
  equipmentId: z.uuid(),
  status: z.enum(EquipmentStatusEnum),
  answers: z.array(
    z.object({
      questionId: z.uuid(),
      hasSeverity: z.literal(["noSeverity", "hasSeverity"]),
      severity: z.enum(DefectSeverityEnum).nullable(),
      text: z.string().nullable(),
      picture: z.string().nullable(),
    }),
  ),
});

type FormValues = z.infer<typeof FormSchema>;

type Props = {
  equipment: FindOneEquipmentResponseDto;
};

export default function InspectionFormComponent({
  equipment,
}: Props): ReactNode {
  const tCommon = useTranslations("Common");
  const t = useTranslations("InspectionsPage");

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutateAsync: createMutateAsync } = useMutation({
    mutationKey: inspectionKeys.create,
    mutationFn: createInspectionApi,
  });

  const form = useForm<FormValues>({
    initialValues: {
      equipmentId: equipment.id,
      status: EquipmentStatusEnum.IN_SERVICE,
      answers: equipment.template.standard.questions.map((question) => ({
        questionId: question.id,
        hasSeverity: "noSeverity",
        severity: DefectSeverityEnum.LOW,
        text: "",
        picture: null,
      })),
    },
    validate: zod4Resolver(FormSchema),
  });

  const handleFormSubmit = async (values: FormValues): Promise<void> => {
    const dto: CreateInspectionRequestDto = {
      equipmentId: values.equipmentId,
      status: values.status,
      answers: values.answers.map((answer) => ({
        questionId: answer.questionId,
        severity: answer.hasSeverity === "hasSeverity" ? answer.severity : null,
        text: answer.text,
        picture: answer.picture,
      })),
    };

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
  };

  const severities = [
    { value: DefectSeverityEnum.LOW, label: tCommon("low") },
    { value: DefectSeverityEnum.MEDIUM, label: tCommon("medium") },
    { value: DefectSeverityEnum.HIGH, label: tCommon("high") },
    { value: DefectSeverityEnum.CRITICAL, label: tCommon("critical") },
  ];

  return (
    <form
      style={{ maxWidth: "30rem" }}
      onSubmit={form.onSubmit(handleFormSubmit)}
    >
      <Stack>
        <Fieldset legend={t("title")}>
          <Text size="md" fw={500}>
            {t("overallStatus")}
          </Text>
          <SegmentedControl
            data={[
              {
                label: tCommon("inService"),
                value: EquipmentStatusEnum.IN_SERVICE,
              },
              {
                label: tCommon("needsRepair"),
                value: EquipmentStatusEnum.NEEDS_REPAIR,
              },
              {
                label: tCommon("outOfService"),
                value: EquipmentStatusEnum.OUT_OF_SERVICE,
              },
            ]}
            {...form.getInputProps("status")}
          />
        </Fieldset>
        {equipment.template.standard.questions.map((question, index) => (
          <Fieldset key={index} legend={t("question", { n: index + 1 })}>
            <Text size="md" fw={500}>
              {question.title}
            </Text>
            <Text c="dimmed" size="sm" mb="sm">
              {question.description}
            </Text>
            <SegmentedControl
              data={[
                { label: tCommon("noSeverity"), value: "noSeverity" },
                { label: tCommon("hasSeverity"), value: "hasSeverity" },
              ]}
              {...form.getInputProps(`answers.${index}.hasSeverity`)}
            />
            {form.values.answers[index].hasSeverity === "hasSeverity" && (
              <Select
                searchable
                withAlignedLabels
                label={tCommon("severity")}
                data={severities}
                mt="xs"
                {...form.getInputProps(`answers.${index}.severity`)}
              />
            )}
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
