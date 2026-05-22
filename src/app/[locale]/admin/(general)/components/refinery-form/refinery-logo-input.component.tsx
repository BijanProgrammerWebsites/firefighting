"use client";
import { ReactNode, useRef } from "react";

import { useTranslations } from "next-intl";

import { Avatar, Button, FileButton, Group, Stack, Text } from "@mantine/core";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { deleteRefineryPictureApi } from "@/api/refinery/delete-refinery-picture.api";
import { editRefineryPictureApi } from "@/api/refinery/edit-refinery-picture.api";

import IconComponent from "@/components/icon/icon.component";

import { refineryKeys } from "@/queries/keys";

import { picturePath } from "@/utils/path.utils";

type Props = {
  picture: string | null;
};

export default function RefineryLogoInputComponent({
  picture,
}: Props): ReactNode {
  const tCommon = useTranslations("Common");
  const t = useTranslations("AdminGeneralPage");

  const resetRef = useRef<() => void>(null);

  const queryClient = useQueryClient();

  const { mutateAsync: deleteMutateAsync } = useMutation({
    mutationKey: refineryKeys.picture.delete,
    mutationFn: deleteRefineryPictureApi,
  });

  const { mutateAsync: editMutateAsync } = useMutation({
    mutationKey: refineryKeys.picture.edit,
    mutationFn: editRefineryPictureApi,
  });

  const clearFile = async (): Promise<void> => {
    await deleteMutateAsync(undefined, {
      onSuccess: async (data): Promise<void> => {
        toast.success(data.message);
        await queryClient.invalidateQueries({ queryKey: refineryKeys.find });
      },
      onError: (error): void => {
        toast.error(error.message);
      },
    });
    resetRef.current?.();
  };

  const handleSetFile = async (payload: File | null): Promise<void> => {
    if (!payload) {
      return;
    }

    await editMutateAsync(
      { picture: payload },
      {
        onSuccess: async (data): Promise<void> => {
          toast.success(data.message);
          await queryClient.invalidateQueries({ queryKey: refineryKeys.find });
        },
        onError: (error): void => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <Stack gap="xs">
      <Group gap="xs">
        <Avatar
          variant="light"
          radius="md"
          size={80}
          src={picturePath(picture)}
          alt={tCommon("logoAlt")}
        />
        <Stack gap="xs">
          <Text size="lg" fw={500}>
            {t("logo")}
          </Text>
          <Group gap="xs">
            <FileButton
              resetRef={resetRef}
              onChange={handleSetFile}
              accept="image/png,image/jpeg"
            >
              {(props) => (
                <Button
                  leftSection={
                    <IconComponent collection="tabler" name="upload" />
                  }
                  {...props}
                >
                  {t("uploadLogo")}
                </Button>
              )}
            </FileButton>
            {picture && (
              <Button
                variant="outline"
                color="gray"
                leftSection={<IconComponent collection="tabler" name="trash" />}
                onClick={clearFile}
              >
                {tCommon("remove")}
              </Button>
            )}
          </Group>
        </Stack>
      </Group>
      <Text c="dimmed">{t("logoHint")}</Text>
    </Stack>
  );
}
