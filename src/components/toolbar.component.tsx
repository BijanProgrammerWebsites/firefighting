"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Box, Button, Group, Text, Title } from "@mantine/core";

import IconComponent from "@/components/icon/icon.component";

import { Link } from "@/i18n/navigation";

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
    <Box mb={noMargin ? 0 : "md"}>
      <Group>
        <Title order={2}>{title}</Title>
        <Box style={{ marginInlineStart: "auto" }}>
          {createHref && (
            <Button
              component={Link}
              href={createHref}
              leftSection={<IconComponent collection="tabler" name="plus" />}
            >
              {tCommon("create")}
            </Button>
          )}
          {parentHref && (
            <Button
              component={Link}
              href={parentHref}
              variant="default"
              leftSection={<IconComponent name="arrow-right-linear" />}
            >
              {tCommon("return")}
            </Button>
          )}
        </Box>
      </Group>
      {subtitle && <Text c="dimmed">{subtitle}</Text>}
    </Box>
  );
}
