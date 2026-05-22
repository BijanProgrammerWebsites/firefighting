import { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { zod4Resolver } from "mantine-form-zod-resolver";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import {
  EditRefineryRequestDto,
  EditRefineryRequestSchema,
  editRefineryApi,
} from "@/api/refinery/edit-refinery.api";

import SubmitButtonComponent from "@/components/submit-button.component";

import { refineryKeys } from "@/queries/keys";

import styles from "./name-box.module.css";

export type Props = {
  title: string;
};

export default function NameBoxComponent({ title }: Props): ReactNode {
  const tCommon = useTranslations("Common");

  const queryClient = useQueryClient();

  const { mutateAsync: editMutateAsync } = useMutation({
    mutationKey: refineryKeys.edit,
    mutationFn: editRefineryApi,
  });

  const form = useForm<EditRefineryRequestDto>({
    initialValues: { title },
    validate: zod4Resolver(EditRefineryRequestSchema),
  });

  const handleFormSubmit = async (
    dto: EditRefineryRequestDto,
  ): Promise<void> => {
    await editMutateAsync(dto, {
      onSuccess: async (data): Promise<void> => {
        toast.success(data.message);
        await queryClient.invalidateQueries({ queryKey: refineryKeys.find });
      },
      onError: (error): void => {
        toast.error(error.message);
      },
    });
  };

  return (
    <form
      className={styles["name-box"]}
      onSubmit={form.onSubmit(handleFormSubmit)}
    >
      <TextInput
        withAsterisk
        className={styles.input}
        label={tCommon("title")}
        {...form.getInputProps("title")}
      />
      <SubmitButtonComponent />
    </form>
  );
}
