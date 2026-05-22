"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Box, Button, Title } from "@mantine/core";

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
    <Box className={clsx(styles.toolbar, noMargin && styles["no-margin"])}>
      <Box className={styles.top}>
        <Title order={2}>{title}</Title>
        <Box className={styles.actions}>
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
        </Box>
      </Box>
      {subtitle && <Box className={styles.bottom}>{subtitle}</Box>}
    </Box>
  );
}
