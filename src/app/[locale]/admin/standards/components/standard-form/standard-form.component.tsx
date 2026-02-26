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

import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { v4 as uuid } from "uuid";

import { zod4Resolver } from "mantine-form-zod-resolver";

import {
  CreateStandardRequestDto,
  CreateStandardSchema,
  createStandardApi,
} from "@/api/standards/create-standard.api";

import IconComponent from "@/components/icon/icon.component";

import { standardKeys } from "@/queries/keys";

import styles from "./standard-form.module.css";

type Props = {
  initialValues?: CreateStandardRequestDto;
};

export default function StandardFormComponent({
  initialValues,
}: Props): ReactNode {
  const t = useTranslations("AdminStandardsPage");
  const tCommon = useTranslations("Common");

  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationKey: standardKeys.create,
    mutationFn: createStandardApi,
  });

  const form = useForm<CreateStandardRequestDto>({
    initialValues: initialValues ?? {
      title: "",
      questions: [],
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
    await mutateAsync(dto, {
      onSuccess: (data): void => {
        toast.success(data.message);
        router.push("/admin/standards");
      },
      onError: (error): void => {
        toast.error(error.message);
      },
    });
  };

  return (
    <form
      className={styles["standard-form"]}
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
