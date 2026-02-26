import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { ActionIcon, Text, Tooltip } from "@mantine/core";
import { ConfirmModalProps, modals } from "@mantine/modals";

import IconComponent from "@/components/icon/icon.component";

type Props = Pick<ConfirmModalProps, "onConfirm"> & {
  itemTitle: string;
};

export default function RemoveButtonComponent({
  itemTitle,
  onConfirm,
}: Props): ReactNode {
  const t = useTranslations("Common");

  const handleRemoveButtonClick = (): void => {
    modals.openConfirmModal({
      title: t("areYouSure"),
      centered: true,
      children: (
        <Text size="sm">{t("removeModalDescription", { itemTitle })}</Text>
      ),
      labels: { confirm: t("confirm"), cancel: t("cancel") },
      confirmProps: { color: "red" },
      onConfirm,
    });
  };

  return (
    <Tooltip label={t("remove")}>
      <ActionIcon
        variant="subtle"
        color="gray"
        aria-label={t("remove")}
        onClick={handleRemoveButtonClick}
      >
        <IconComponent name="trash-bin-trash-linear" />
      </ActionIcon>
    </Tooltip>
  );
}
