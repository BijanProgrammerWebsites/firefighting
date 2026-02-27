import { ReactNode, useState } from "react";

import { useTranslations } from "next-intl";

import { ActionIcon, Text } from "@mantine/core";
import { modals } from "@mantine/modals";

import clsx from "clsx";

import IconComponent from "@/components/icon/icon.component";

import TextFormComponent from "@/admin/(general)/components/refinery-form/components/site-management/components/list-box/components/text-form/text-form.component";
import { ListItemType } from "@/admin/(general)/types/list-item.type";

import styles from "./list-item.module.css";

type Props = {
  item: ListItemType;
  onRemove: (item: ListItemType) => void;
  onEdit: (newItem: ListItemType) => void;
  onSelect: (itemId: string) => void;
  selected?: boolean;
};
export default function ListItemComponent({
  item,
  onRemove,
  onEdit,
  selected,
  onSelect,
}: Props): ReactNode {
  const tCommon = useTranslations("Common");

  const [mode, setMode] = useState<"edit" | "none">("none");

  const handleRemoveMode = (): void => {
    modals.openConfirmModal({
      title: tCommon("areYouSure"),
      centered: true,
      children: (
        <Text size="sm">
          {tCommon("removeModalDescription", { itemTitle: item.name })}
        </Text>
      ),
      labels: { confirm: tCommon("confirm"), cancel: tCommon("cancel") },
      confirmProps: { color: "red" },
      onConfirm: handleRemoveItem,
    });
  };

  const handleOnTextFormValueChange = (value: string): void => {
    onEdit({ id: item.id, name: value });
    setMode("none");
  };

  const handleRemoveItem = (): void => {
    onRemove(item);
  };

  const handleSelectItem = (): void => {
    if (mode === "none") {
      onSelect(item.id);
    }
  };

  return (
    <div
      className={clsx(styles["list-item"], selected && styles.selected)}
      onClick={handleSelectItem}
    >
      {mode !== "edit" && item.name}
      {mode === "edit" && (
        <TextFormComponent
          defaultValue={item.name}
          onSubmit={handleOnTextFormValueChange}
          onCancel={() => setMode("none")}
        />
      )}
      {mode === "none" && (
        <div className={styles["buttons"]}>
          <ActionIcon
            variant="outline"
            size="sm"
            onClick={() => setMode("edit")}
          >
            <IconComponent collection="tabler" name="edit" />
          </ActionIcon>
          <ActionIcon
            color="red"
            variant="outline"
            size="sm"
            onClick={handleRemoveMode}
          >
            <IconComponent collection="tabler" name="trash" />
          </ActionIcon>
        </div>
      )}
    </div>
  );
}
