import { type ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { Text, Title } from "@mantine/core";

import SignInFormComponent from "@/auth/sign-in/components/sign-in-form/sign-in-form.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import styles from "./page.module.css";

export const generateMetadata = generateDynamicMetadata("SignInPage");

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
