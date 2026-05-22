"use client";

import type { ReactNode } from "react";

import { ActionIcon, Box } from "@mantine/core";

import clsx from "clsx";

import IconComponent from "@/components/icon/icon.component";
import LogoTypeComponent from "@/components/logo-type.component";
import SignOutButtonComponent from "@/components/sign-out-button.component";
import ToggleLocaleComponent from "@/components/toggle-locale.component";

import { Link } from "@/i18n/navigation";

import styles from "./header.module.css";

type Props = {
  className?: string;
};

export default function HeaderComponent({ className }: Props): ReactNode {
  return (
    <header className={clsx(styles.header, className)}>
      <LogoTypeComponent href="/" />
      <Box className={styles.actions}>
        <ActionIcon
          component={Link}
          href="/notifications"
          variant="subtle"
          color="dark"
          size="lg"
          aria-label="Notifications"
        >
          <IconComponent name="bell-linear" size="lg" />
        </ActionIcon>
        <ToggleLocaleComponent />
        <SignOutButtonComponent />
      </Box>
    </header>
  );
}
