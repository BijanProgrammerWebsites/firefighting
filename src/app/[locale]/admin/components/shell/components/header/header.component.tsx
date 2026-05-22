import type { ReactNode } from "react";

import { Box, Burger } from "@mantine/core";

import LogoTypeComponent from "@/components/logo-type.component";
import SignOutButtonComponent from "@/components/sign-out-button.component";
import ToggleLocaleComponent from "@/components/toggle-locale.component";

import styles from "./header.module.css";

type Props = {
  opened: boolean;
  toggle: () => void;
};

export default function HeaderComponent({ opened, toggle }: Props): ReactNode {
  return (
    <Box className={styles.header} p="md">
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      <LogoTypeComponent href="/admin" />
      <Box className={styles.actions}>
        <ToggleLocaleComponent />
        <SignOutButtonComponent />
      </Box>
    </Box>
  );
}
