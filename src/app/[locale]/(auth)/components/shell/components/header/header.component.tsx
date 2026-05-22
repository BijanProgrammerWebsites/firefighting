"use client";

import type { ReactNode } from "react";

import { Box } from "@mantine/core";

import clsx from "clsx";

import LogoTypeComponent from "@/components/logo-type.component";
import ToggleLocaleComponent from "@/components/toggle-locale.component";

import styles from "./header.module.css";

type Props = {
  className?: string;
};

export default function HeaderComponent({ className }: Props): ReactNode {
  return (
    <header className={clsx(styles.header, className)}>
      <LogoTypeComponent href="/sign-in" />
      <Box className={styles.actions}>
        <ToggleLocaleComponent />
      </Box>
    </header>
  );
}
