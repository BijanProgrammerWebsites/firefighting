import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import styles from "./page.module.css";

export const generateMetadata = generateDynamicMetadata("AdminUsersPage");

export default async function UsersPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminUsersPage");

  return <div className={styles.users}>{t("title")}</div>;
}
