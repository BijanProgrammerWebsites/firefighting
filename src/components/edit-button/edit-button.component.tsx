import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { ActionIcon, Tooltip } from "@mantine/core";

import IconComponent from "@/components/icon/icon.component";

import { Link } from "@/i18n/navigation";

type Props = {
  href: string;
};

export default function EditButtonComponent({ href }: Props): ReactNode {
  const t = useTranslations("Common");

  return (
    <Tooltip label={t("edit")}>
      <ActionIcon
        component={Link}
        href={href}
        variant="subtle"
        color="gray"
        aria-label={t("edit")}
      >
        <IconComponent name="pen-linear" />
      </ActionIcon>
    </Tooltip>
  );
}
