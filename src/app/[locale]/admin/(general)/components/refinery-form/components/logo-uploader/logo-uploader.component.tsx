"use client";
import { ReactNode, useRef } from "react";

import { useTranslations } from "next-intl";

import { Avatar, Box, Button, FileButton } from "@mantine/core";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { deleteRefineryPictureApi } from "@/api/refinery/delete-refinery-picture.api";
import { editRefineryPictureApi } from "@/api/refinery/edit-refinery-picture.api";

import IconComponent from "@/components/icon/icon.component";

import { refineryKeys } from "@/queries/keys";

import { picturePath } from "@/utils/path.utils";

import styles from "./logo-uploader.module.css";

type Props = {
  picture: string | null;
};

export default function LogoUploaderComponent({ picture }: Props): ReactNode {
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
    <Box className={styles["logo-uploader"]}>
      <Avatar
        className={styles.avatar}
        variant="light"
        radius="md"
        size="xl"
        src={picturePath(picture)}
        alt=""
      />
      <Box className={styles["upload-buttons"]}>
        <FileButton
          resetRef={resetRef}
          onChange={handleSetFile}
          accept="image/png,image/jpeg"
        >
          {(props) => (
            <Button
              leftSection={<IconComponent collection="tabler" name="upload" />}
              {...props}
            >
              {t("uploadLogo")}
            </Button>
          )}
        </FileButton>
        <Button
          disabled={!picture}
          color="red"
          leftSection={<IconComponent collection="tabler" name="trash" />}
          onClick={clearFile}
        >
          {tCommon("remove")}
        </Button>
      </Box>
    </Box>
  );
}
