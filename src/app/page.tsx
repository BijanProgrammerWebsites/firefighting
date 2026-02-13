import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { Text } from "@mantine/core";

import styles from "./page.module.css";

export default async function Home(): Promise<ReactNode> {
  const t = await getTranslations("HomePage");

  return (
    <div className={styles.home}>
      <Text>{t("title")}</Text>
    </div>
  );
}
