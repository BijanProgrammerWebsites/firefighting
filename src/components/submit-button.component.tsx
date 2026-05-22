"use client";

import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Button, ButtonProps } from "@mantine/core";

import IconComponent from "@/components/icon/icon.component";

type Props = ButtonProps;

export default function SubmitButtonComponent(props: Props): ReactNode {
  const tCommon = useTranslations("Common");

  return (
    <Button
      type="submit"
      w="max-content"
      leftSection={<IconComponent collection="tabler" name="check" />}
      {...props}
    >
      {tCommon("submit")}
    </Button>
  );
}
