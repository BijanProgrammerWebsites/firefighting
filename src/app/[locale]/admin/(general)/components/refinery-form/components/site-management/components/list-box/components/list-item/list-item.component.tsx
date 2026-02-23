import { ReactNode, useState } from "react";

import clsx from "clsx";

import { ActionIcon } from "@mantine/core";

import IconComponent from "@/components/icon/icon.component";

import RemoveItemDialogComponent from "@/admin/(general)/components/refinery-form/components/site-management/components/list-box/components/remove-item/remove-item-dialog.component";
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
  const [mode, setMode] = useState<"edit" | "remove" | "none">("none");

  const handleRemoveMode = (): void => {
    setMode("remove");
  };

  const handleOnTextFormValueChange = (value: string): void => {
    onEdit({ id: item.id, name: value });
    setMode("none");
  };

  const handleRemoveItem = (): void => {
    onRemove(item);
  };
  const handleCancelRemoveItem = (): void => {
    setMode("none");
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
      <RemoveItemDialogComponent
        opened={mode === "remove"}
        onSuccess={handleRemoveItem}
        onCancel={handleCancelRemoveItem}
      />
    </div>
  );
}
