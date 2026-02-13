import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { ActionIcon, Box, Burger } from "@mantine/core";

import IconComponent from "@/components/icon/icon.component";

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
      <Link className={styles.name} href="/public">
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
      </div>
    </Box>
  );
}
