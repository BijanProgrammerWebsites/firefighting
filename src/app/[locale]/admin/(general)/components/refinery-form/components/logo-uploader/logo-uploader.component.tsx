"use client";
import { ReactNode, use, useRef, useState } from "react";

import { useTranslations } from "next-intl";

import { Avatar, Button, FileButton } from "@mantine/core";

import { RefineryGeneralFormContext } from "@/admin/(general)/contexts/refinery-general-form-context";

import styles from "./logo-uploader.module.css";

export default function LogoUploaderComponent(): ReactNode {
  const t = useTranslations("AdminGeneralPage");
  const { dispatch } = use(RefineryGeneralFormContext);
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);

  const clearFile = (): void => {
    setFile(null);
    resetRef.current?.();
  };
  const handleSetFile = (payload: File | null): void => {
    if (!payload) {
      return;
    }
    setFile(payload);
    dispatch({ type: "set_logo", payload: URL.createObjectURL(payload) });
  };
  return (
    <div className={styles["logo-uploader"]}>
      <div className={styles.preview}>
        <Avatar
          variant="filled"
          radius="md"
          size="xl"
          src={file && URL.createObjectURL(file)}
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
        <Button disabled={!file} color="red" onClick={clearFile}>
          {t("reset")}
        </Button>
      </div>
    </div>
  );
}
