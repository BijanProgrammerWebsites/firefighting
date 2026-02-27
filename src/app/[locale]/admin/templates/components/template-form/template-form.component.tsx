"use client";

import type { ReactNode } from "react";

import { useRouter } from "next/navigation";

import { useTranslations } from "next-intl";

import {
  ActionIcon,
  Button,
  Fieldset,
  Group,
  TextInput,
  Textarea,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { v4 as uuid } from "uuid";

import { zod4Resolver } from "mantine-form-zod-resolver";

import {
  CreateTemplateRequestDto,
  CreateTemplateSchema,
  createTemplateApi,
} from "@/api/templates/create-template.api";
import { editTemplateApi } from "@/api/templates/edit-template.api";

import IconComponent from "@/components/icon/icon.component";

import { templateKeys } from "@/queries/keys";

import styles from "./template-form.module.css";

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
      questions: [],
    },
    validate: zod4Resolver(CreateTemplateSchema),
  });

  const handleAddMoreButtonClick = (): void => {
    form.insertListItem("questions", {
      id: uuid(),
      title: "",
      description: "",
    });
  };

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

  return (
    <form
      className={styles["template-form"]}
      onSubmit={form.onSubmit(handleFormSubmit)}
    >
      <TextInput
        withAsterisk
        label={t("titleField")}
        {...form.getInputProps("title")}
      />
      {form.getValues().questions.map((question, index) => (
        <Fieldset
          key={question.id}
          legend={
            <Group gap="xs">
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
        <Button variant="default" onClick={handleAddMoreButtonClick}>
          {t("addMore")}
        </Button>
        <Button type="submit">{t("submit")}</Button>
      </Group>
    </form>
  );
}
