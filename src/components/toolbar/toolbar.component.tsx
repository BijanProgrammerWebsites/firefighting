"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Button, Title } from "@mantine/core";

import clsx from "clsx";

import { Link } from "@/i18n/navigation";

import styles from "./toolbar.module.css";

type Props = {
  title: string;
  subtitle?: ReactNode;
  parentHref?: string;
  createHref?: string;
  noMargin?: boolean;
};

export default function ToolbarComponent({
  title,
  subtitle,
  parentHref,
  createHref,
  noMargin = false,
}: Props): ReactNode {
  const tCommon = useTranslations("Common");

  return (
    <div className={clsx(styles.toolbar, noMargin && styles["no-margin"])}>
      <div className={styles.top}>
        <Title order={2}>{title}</Title>
        <div className={styles.actions}>
          {createHref && (
            <Button component={Link} href={createHref}>
              {tCommon("create")}
            </Button>
          )}
          {parentHref && (
            <Button component={Link} href={parentHref} variant="default">
              {tCommon("return")}
            </Button>
          )}
        </div>
      </div>
      {subtitle && <div className={styles.bottom}>{subtitle}</div>}
    </div>
  );
}
