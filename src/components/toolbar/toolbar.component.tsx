"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Button, Title } from "@mantine/core";

import { Link } from "@/i18n/navigation";

import styles from "./toolbar.module.css";

type Props = {
  title: string;
  parentHref?: string;
  createHref?: string;
};

export default function ToolbarComponent({
  title,
  parentHref,
  createHref,
}: Props): ReactNode {
  const tCommon = useTranslations("Common");

  return (
    <div className={styles.toolbar}>
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
  );
}
