"use client";
import { ReactNode, useRef } from "react";

import { useTranslations } from "next-intl";

import { Avatar, Button, FileButton } from "@mantine/core";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { deleteRefineryPictureApi } from "@/api/refinery/delete-refinery-picture.api";
import { editRefineryPictureApi } from "@/api/refinery/edit-refinery-picture.api";

import { refineryKeys } from "@/queries/keys";

import styles from "./logo-uploader.module.css";

type Props = {
  picture?: string | null;
};
export default function LogoUploaderComponent({ picture }: Props): ReactNode {
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
      onSuccess: (data): void => {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: refineryKeys.find });
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
        onSuccess: (data): void => {
          toast.success(data.message);
          queryClient.invalidateQueries({ queryKey: refineryKeys.find });
        },
        onError: (error): void => {
          toast.error(error.message);
        },
      },
    );
  };

  return (
    <div className={styles["logo-uploader"]}>
      <div className={styles.preview}>
        <Avatar
          variant="filled"
          radius="md"
          size="xl"
          src={process.env.NEXT_PUBLIC_API_BASE_URL + "/pictures/" + picture}
          alt="Logo preview"
        />
      </div>
      <div className={styles["upload-buttons"]}>
        <FileButton
          resetRef={resetRef}
          onChange={handleSetFile}
          accept="image/png,image/jpeg"
        >
          {(props) => <Button {...props}>{t("uploadLogo")}</Button>}
        </FileButton>
        <Button disabled={!picture} color="red" onClick={clearFile}>
          {t("reset")}
        </Button>
      </div>
    </div>
  );
}
