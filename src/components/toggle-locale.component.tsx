"use client";

import type { ReactNode } from "react";

import { useLocale, useTranslations } from "next-intl";

import { ActionIcon, Tooltip } from "@mantine/core";

import IconComponent from "@/components/icon/icon.component";

import { usePathname, useRouter } from "@/i18n/navigation";

export default function ToggleLocaleComponent(): ReactNode {
  const t = useTranslations("Shell");

  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleToggleButtonClick = (): void => {
    router.replace(pathname, { locale: locale === "fa" ? "en" : "fa" });
  };

  return (
    <Tooltip label={t("toggleLocale")}>
      <ActionIcon
        variant="subtle"
        color="dark"
        size="lg"
        aria-label={t("toggleLocale")}
        onClick={handleToggleButtonClick}
      >
        <IconComponent collection="tabler" name="language" size="lg" />
      </ActionIcon>
    </Tooltip>
  );
}
