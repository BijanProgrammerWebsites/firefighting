"use client";

import type { ReactNode } from "react";

import { useRouter } from "next/navigation";

import { useTranslations } from "next-intl";

import { PasswordInput, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import { zod4Resolver } from "mantine-form-zod-resolver";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import {
  CreateUserRequestDto,
  CreateUserSchema,
  createUserApi,
} from "@/api/users/create-user.api";
import { editUserApi } from "@/api/users/edit-user.api";

import IconComponent from "@/components/icon/icon.component";
import SubmitButtonComponent from "@/components/submit-button.component";

import { RoleEnum } from "@/enums/role.enum";

import { userKeys } from "@/queries/keys";

type Props =
  | {
      id?: never;
      initialValues?: never;
    }
  | {
      id: string;
      initialValues: CreateUserRequestDto;
    };

export default function UserFormComponent({
  id,
  initialValues,
}: Props): ReactNode {
  const t = useTranslations("AdminUsersPage");

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutateAsync: createMutateAsync } = useMutation({
    mutationKey: userKeys.create,
    mutationFn: createUserApi,
  });

  const { mutateAsync: editMutateAsync } = useMutation({
    mutationKey: userKeys.edit,
    mutationFn: editUserApi,
  });

  const form = useForm<CreateUserRequestDto>({
    initialValues: initialValues ?? {
      username: "",
      password: "",
      role: RoleEnum.INSPECTOR,
    },
    validate: zod4Resolver(CreateUserSchema),
  });

  const handleFormSubmit = async (dto: CreateUserRequestDto): Promise<void> => {
    if (id) {
      await editMutateAsync(
        { id, ...dto },
        {
          onSuccess: async (data): Promise<void> => {
            toast.success(data.message);
            await queryClient.invalidateQueries({ queryKey: userKeys.all });
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
          await queryClient.invalidateQueries({ queryKey: userKeys.all });
          router.push("/admin/users");
        },
        onError: (error): void => {
          toast.error(error.message);
        },
      });
    }
  };

  const roles = [
    { value: RoleEnum.ADMIN, label: t("admin") },
    { value: RoleEnum.INSPECTOR, label: t("inspector") },
    { value: RoleEnum.VIEWER, label: t("viewer") },
  ];

  return (
    <form
      style={{ maxWidth: "30rem" }}
      onSubmit={form.onSubmit(handleFormSubmit)}
    >
      <Stack>
        <TextInput
          withAsterisk
          label={t("username")}
          {...form.getInputProps("username")}
        />
        <PasswordInput
          withAsterisk
          label={t("password")}
          autoComplete="new-password"
          leftSection={
            <IconComponent name="lock-keyhole-minimalistic-outline" />
          }
          {...form.getInputProps("password")}
        />
        <Select
          withAsterisk
          searchable
          withAlignedLabels
          label={t("role")}
          data={roles}
          {...form.getInputProps("role")}
        />
        <SubmitButtonComponent />
      </Stack>
    </form>
  );
}
