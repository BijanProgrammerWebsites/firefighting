"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { ActionIcon } from "@mantine/core";

import clsx from "clsx";

import IconComponent from "@/components/icon/icon.component";

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
      <div className={styles.actions}>
        <ActionIcon
          variant="subtle"
          color="dark"
          size="lg"
          aria-label="Change Language"
        >
          <IconComponent collection="tabler" name="language" />
        </ActionIcon>
        <ActionIcon
          component={Link}
          href="/notifications"
          variant="subtle"
          color="dark"
          size="lg"
          aria-label="Notifications"
        >
          <IconComponent name="bell-linear" />
        </ActionIcon>
      </div>
    </header>
  );
}
