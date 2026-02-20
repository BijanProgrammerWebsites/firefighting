import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { ActionIcon, Tooltip } from "@mantine/core";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { signOutApi } from "@/api/auth/sign-out.api";

import IconComponent from "@/components/icon/icon.component";

import { useRouter } from "@/i18n/navigation";

import { authKeys, mutationKeys, userKeys } from "@/queries/keys";

export default function SignOutButtonComponent(): ReactNode {
  const t = useTranslations("Shell");

  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationKey: mutationKeys.signOut(),
    mutationFn: signOutApi,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async (result) => {
      queryClient.removeQueries({ queryKey: userKeys.all });
      queryClient.removeQueries({ queryKey: authKeys.verify() });

      toast.success(result.message);

      router.push("/");
    },
  });

  const handleSignOutButtonClick = async (): Promise<void> => {
    await mutateAsync();
  };

  return (
    <Tooltip label={t("signOut")}>
      <ActionIcon
        variant="subtle"
        color="dark"
        size="lg"
        aria-label={t("signOut")}
        onClick={handleSignOutButtonClick}
      >
        <IconComponent name="logout-2-linear" size="lg" />
      </ActionIcon>
    </Tooltip>
  );
}
