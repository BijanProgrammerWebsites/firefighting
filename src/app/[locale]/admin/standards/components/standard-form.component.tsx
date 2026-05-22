"use client";

import type { ReactNode } from "react";

import { useRouter } from "next/navigation";

import { useTranslations } from "next-intl";

import {
  ActionIcon,
  Button,
  Fieldset,
  Group,
  Text,
  TextInput,
  Textarea,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { zod4Resolver } from "mantine-form-zod-resolver";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { v4 as uuid } from "uuid";

import {
  CreateStandardRequestDto,
  CreateStandardSchema,
  createStandardApi,
} from "@/api/standards/create-standard.api";
import { editStandardApi } from "@/api/standards/edit-standard.api";

import IconComponent from "@/components/icon/icon.component";
import SubmitButtonComponent from "@/components/submit-button.component";

import { standardKeys } from "@/queries/keys";

type Props =
  | {
      id?: never;
      initialValues?: never;
    }
  | {
      id: string;
      initialValues: CreateStandardRequestDto;
    };

export default function StandardFormComponent({
  id,
  initialValues,
}: Props): ReactNode {
  const tCommon = useTranslations("Common");
  const t = useTranslations("AdminStandardsPage");

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutateAsync: createMutateAsync } = useMutation({
    mutationKey: standardKeys.create,
    mutationFn: createStandardApi,
  });

  const { mutateAsync: editMutateAsync } = useMutation({
    mutationKey: standardKeys.edit,
    mutationFn: editStandardApi,
  });

  const form = useForm<CreateStandardRequestDto>({
    initialValues: initialValues ?? {
      title: "",
      questions: [
        {
          id: uuid(),
          title: "",
          description: "",
        },
      ],
    },
    validate: zod4Resolver(CreateStandardSchema),
  });

  const handleAddMoreButtonClick = (): void => {
    form.insertListItem("questions", {
      id: uuid(),
      title: "",
      description: "",
    });
  };

  const handleFormSubmit = async (
    dto: CreateStandardRequestDto,
  ): Promise<void> => {
    if (id) {
      await editMutateAsync(
        { id, ...dto },
        {
          onSuccess: async (data): Promise<void> => {
            toast.success(data.message);
            await queryClient.invalidateQueries({ queryKey: standardKeys.all });
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
          await queryClient.invalidateQueries({ queryKey: standardKeys.all });
          router.push("/admin/standards");
        },
        onError: (error): void => {
          toast.error(error.message);
        },
      });
    }
  };

  return (
    <form
      style={{ maxWidth: "30rem" }}
      onSubmit={form.onSubmit(handleFormSubmit)}
    >
      <TextInput
        withAsterisk
        label={t("titleField")}
        {...form.getInputProps("title")}
      />
      {form.values.questions.map((question, index) => (
        <Fieldset
          key={question.id}
          legend={
            <Group gap="xs">
              {form.values.questions.length > 1 && (
                <Tooltip label={tCommon("remove")}>
                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    aria-label={tCommon("remove")}
                    onClick={() => form.removeListItem("questions", index)}
                  >
                    <IconComponent name="trash-bin-trash-linear" />
                  </ActionIcon>
                </Tooltip>
              )}
              {t("question", { n: index + 1 })}
            </Group>
          }
          mt="md"
        >
          <TextInput
            withAsterisk
            label={t("titleField")}
            {...form.getInputProps(`questions.${index}.title`)}
          />
          <Textarea
            label={t("description")}
            mt="xs"
            {...form.getInputProps(`questions.${index}.description`)}
          />
        </Fieldset>
      ))}
      <Group gap="xs" mt="md">
        <Button
          variant="default"
          leftSection={<IconComponent collection="tabler" name="plus" />}
          onClick={handleAddMoreButtonClick}
        >
          {t("addMore")}
        </Button>
        <SubmitButtonComponent />
      </Group>
      {form.errors.questions && (
        <Text c="red" mt="md">
          {form.errors.questions}
        </Text>
      )}
    </form>
  );
}
