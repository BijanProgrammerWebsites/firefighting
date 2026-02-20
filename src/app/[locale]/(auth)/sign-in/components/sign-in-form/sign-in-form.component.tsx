"use client";

import { type ReactNode } from "react";

import { useRouter } from "next/navigation";

import { useTranslations } from "next-intl";

import { Button, PasswordInput, TextInput } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";

import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { SignInRequestDto, signInApi } from "@/api/auth/sign-in.api";

import IconComponent from "@/components/icon/icon.component";

import { mutationKeys } from "@/queries/keys";

import styles from "./sign-in-form.module.css";

export default function SignInFormComponent(): ReactNode {
  const t = useTranslations("SignInPage");

  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationKey: mutationKeys.signIn(),
    mutationFn: signInApi,
  });

  const form = useForm<SignInRequestDto>({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: hasLength({ min: 1 }, t("usernameIsRequired")),
      password: hasLength({ min: 1 }, t("passwordIsRequired")),
    },
  });

  const handleFormSubmit = async (dto: SignInRequestDto): Promise<void> => {
    await mutateAsync(dto, {
      onSuccess: (data): void => {
        toast.success(data.message);

        if ("result" in data) {
          router.push(data.result.role === "admin" ? "/admin" : "/");
        } else {
          router.push("/");
        }
      },
      onError: (error): void => {
        toast.error(error.message);
      },
    });
  };

  return (
    <form
      className={styles["sign-in-form"]}
      onSubmit={form.onSubmit(handleFormSubmit)}
    >
      <TextInput
        withAsterisk
        label={t("username")}
        leftSection={<IconComponent name="user-linear" />}
        {...form.getInputProps("username")}
      />
      <PasswordInput
        withAsterisk
        label={t("password")}
        autoComplete="current-password"
        leftSection={<IconComponent name="lock-keyhole-minimalistic-outline" />}
        {...form.getInputProps("password")}
      />
      <Button type="submit">{t("submit")}</Button>
    </form>
  );
}
