import { type ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import SignInFormComponent from "@/auth/sign-in/components/sign-in-form/sign-in-form.component";
import { Text, Title } from "@mantine/core";

import styles from "./page.module.css";

export default async function Page(): Promise<ReactNode> {
  const t = await getTranslations("SignInPage");

  return (
    <div className={styles["sign-in"]}>
      <div className={styles.writings}>
        <Title order={1}>{t("title")}</Title>
        <Text>{t("subtitle")}</Text>
      </div>
      <SignInFormComponent />
    </div>
  );
}
