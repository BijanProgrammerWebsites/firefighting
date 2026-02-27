import { ChangeEvent, ReactNode, useRef } from "react";

import { useTranslations } from "next-intl";

import { Button, TextInput } from "@mantine/core";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";

import { editRefineryApi } from "@/api/refinery/edit-refinery.api";

import { refineryKeys } from "@/queries/keys";

import styles from "./name-box.module.css";

export type Props = {
  title?: string;
};
export default function NameBoxComponent({ title }: Props): ReactNode {
  const name = useRef(title ?? "");

  const t = useTranslations("AdminGeneralPage");

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationKey: refineryKeys.edit,
    mutationFn: editRefineryApi,
  });

  const handleButtonClick = async (): Promise<void> => {
    await mutateAsync(
      { title: name.current },
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

  const handleSetName = (e: ChangeEvent<HTMLInputElement>): void => {
    name.current = e.target.value;
  };
  return (
    <div className={styles["name-box"]}>
      <TextInput
        label={t("refineryName")}
        defaultValue={title}
        onChange={handleSetName}
        className={styles.input}
      />
      <Button onClick={handleButtonClick}>تغییر نام پالایشگاه</Button>
    </div>
  );
}
