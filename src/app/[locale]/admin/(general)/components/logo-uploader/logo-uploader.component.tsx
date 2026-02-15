"use client";
import { ReactNode, useState } from "react";

import { Avatar, FileInput } from "@mantine/core";

import styles from "./logo-uploader.module.css";

export default function LogoUploaderComponent(): ReactNode {
  const [preview, setPreview] = useState<File | null>(null);
  const handleChange = (file: File | null): void => {
    if (!file) {
      setPreview(null);
      return;
    }
    setPreview(file);
  };
  return (
    <div className={styles["logo-uploader"]}>
      <FileInput
        label="آپلود لوگو"
        placeholder="یک تصویر انتخاب کنید"
        accept="image/*"
        onChange={handleChange}
        clearable
        className={styles["file-input"]}
      />
      {preview && (
        <div className={styles.preview}>
          <Avatar
            variant="filled"
            radius="md"
            size="xl"
            src={URL.createObjectURL(preview)}
            alt="Logo preview"
          />
        </div>
      )}
    </div>
  );
}
