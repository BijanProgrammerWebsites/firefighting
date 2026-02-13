import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import styles from "./page.module.css";

export default async function UsersPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminUsersPage");

  return <div className={styles.users}>{t("title")}</div>;
}
