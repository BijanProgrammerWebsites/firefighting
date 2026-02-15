import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { TextInput } from "@mantine/core";

import LogoUploaderComponent from "@/admin/(general)/components/logo-uploader/logo-uploader.component";

import styles from "./page.module.css";

export default async function GeneralPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminGeneralPage");

  return (
    <div className={styles.general}>
      <div className={styles.header}>
        <TextInput label="نام پالایشگاه" />
        <LogoUploaderComponent />
      </div>
    </div>
  );
}
