"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Box } from "@mantine/core";

import clsx from "clsx";

import ToggleLocaleComponent from "@/components/toggle-locale.component";

import { Link } from "@/i18n/navigation";

import styles from "./header.module.css";

type Props = {
  className?: string;
};

export default function HeaderComponent({ className }: Props): ReactNode {
  const t = useTranslations("App");

  return (
    <header className={clsx(styles.header, className)}>
      <Link className={styles.name} href="/">
        {t("name")}
      </Link>
      <Box className={styles.actions}>
        <ToggleLocaleComponent />
      </Box>
    </header>
  );
}
