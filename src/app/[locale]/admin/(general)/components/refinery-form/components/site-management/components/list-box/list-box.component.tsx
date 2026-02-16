import { ReactNode, useState } from "react";

import { ActionIcon, Divider } from "@mantine/core";

import IconComponent from "@/components/icon/icon.component";

import ListItemComponent from "@/admin/(general)/components/refinery-form/components/site-management/components/list-box/components/list-item/list-item.component";
import TextFormComponent from "@/admin/(general)/components/refinery-form/components/site-management/components/list-box/components/text-form/text-form.component";
import { ListItemType } from "@/admin/(general)/types/list-item.type";

import styles from "./list-box.module.css";

type Props = {
  items: ListItemType[];
  title: string;
  onAdd: (name: string) => void;
  onRemove: (item: ListItemType) => void;
  onEdit: (item: ListItemType) => void;
  onSelect: (id: string) => void;
  selectedItemId?: string;
  addIconDisable?: boolean;
  messages?: string;
};
export function ListBoxComponent({
  items,
  title,
  onEdit,
  onRemove,
  onAdd,
  onSelect,
  selectedItemId,
  messages,
  addIconDisable,
}: Props): ReactNode {
  const [addMode, setAddMode] = useState(false);
  const handleEditItem = (newItem: ListItemType): void => {
    onEdit(newItem);
  };
  const handleRemoveItem = (item: ListItemType): void => {
    onRemove(item);
  };
  const handleAddItem = (value: string): void => {
    setAddMode(false);
    onAdd(value);
  };

  const handleAddIconClick = (): void => {
    setAddMode(true);
  };
  const handleCancelAddIconClick = (): void => {
    setAddMode(false);
  };

  const messageBox = (
    <div className={styles["list-box-message"]}>{messages}</div>
  );
  const detailBox = (
    <ul>
      {addMode && (
        <TextFormComponent
          onChangeValue={handleAddItem}
          onCancelValueChange={handleCancelAddIconClick}
        />
      )}
      {items.map((item) => (
        <ListItemComponent
          key={item.id}
          item={item}
          onEdit={handleEditItem}
          onRemove={handleRemoveItem}
          onSelect={onSelect}
          selected={item.id === selectedItemId}
        />
      ))}
    </ul>
  );

  return (
    <div className={styles["list-box"]}>
      <div className={styles.header}>
        <p>{title}</p>
        <ActionIcon
          variant="outline"
          size="xs"
          disabled={addIconDisable}
          onClick={handleAddIconClick}
        >
          <IconComponent
            collection="tabler"
            name="plus"
            width={16}
            height={16}
          />
        </ActionIcon>
      </div>
      <Divider />
      {!!messages && !addMode ? messageBox : detailBox}
    </div>
  );
}
