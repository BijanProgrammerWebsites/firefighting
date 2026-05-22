"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Button } from "@mantine/core";

import IconComponent from "@/components/icon/icon.component";

export default function SubmitButtonComponent(): ReactNode {
  const tCommon = useTranslations("Common");

  return (
    <Button
      type="submit"
      leftSection={<IconComponent collection="tabler" name="check" />}
    >
      {tCommon("submit")}
    </Button>
  );
}
