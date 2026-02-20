import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Box, Burger } from "@mantine/core";

import ToggleLocaleComponent from "@/components/toggle-locale/toggle-locale.component";

import { Link } from "@/i18n/navigation";

import styles from "./header.module.css";

type Props = {
  opened: boolean;
  toggle: () => void;
};

export default function HeaderComponent({ opened, toggle }: Props): ReactNode {
  const t = useTranslations("App");

  return (
    <Box className={styles.header} p="md">
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      <Link className={styles.name} href="/admin">
        {t("name")}
      </Link>
      <div className={styles.actions}>
        <ToggleLocaleComponent />
      </div>
    </Box>
  );
}
