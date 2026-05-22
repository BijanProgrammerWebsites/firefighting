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
  const tCommon = useTranslations("Common");

  const handleRemoveButtonClick = (): void => {
    modals.openConfirmModal({
      title: tCommon("areYouSure"),
      centered: true,
      children: (
        <Text size="sm">
          {tCommon("removeModalDescription", { itemTitle })}
        </Text>
      ),
      labels: { confirm: tCommon("confirm"), cancel: tCommon("cancel") },
      confirmProps: { color: "red" },
      onConfirm,
    });
  };

  return (
    <Tooltip label={tCommon("remove")}>
      <ActionIcon
        variant="subtle"
        color="gray"
        aria-label={tCommon("remove")}
        onClick={handleRemoveButtonClick}
      >
        <IconComponent name="trash-bin-trash-linear" />
      </ActionIcon>
    </Tooltip>
  );
}
