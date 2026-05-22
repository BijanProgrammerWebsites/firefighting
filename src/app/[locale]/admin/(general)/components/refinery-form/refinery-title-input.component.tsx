import { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Group, TextInput } from "@mantine/core";
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

export type Props = {
  title: string;
};

export default function RefineryTitleInputComponent({
  title,
}: Props): ReactNode {
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
      style={{ maxWidth: "20rem" }}
      onSubmit={form.onSubmit(handleFormSubmit)}
    >
      <Group gap="xs" align="end">
        <TextInput
          withAsterisk
          label={tCommon("title")}
          flex={1}
          {...form.getInputProps("title")}
        />
        <SubmitButtonComponent />
      </Group>
    </form>
  );
}
