import { ReactNode, useState } from "react";

import { ActionIcon, Box, Divider, List, Loader, Text } from "@mantine/core";

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
  isLoading?: boolean;
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
  isLoading,
}: Props): ReactNode {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddItem = (value: string): void => {
    setIsAdding(false);
    onAdd(value);
  };

  const messageBox = <Box className={styles["message"]}>{messages}</Box>;
  const detailBox = (
    <List className={styles["detail"]}>
      {isAdding && (
        <TextFormComponent
          onSubmit={handleAddItem}
          onCancel={() => setIsAdding(false)}
        />
      )}
      {items.map((item) => (
        <ListItemComponent
          key={item.id}
          item={item}
          onEdit={(item) => onEdit(item)}
          onRemove={(item) => onRemove(item)}
          onSelect={onSelect}
          selected={item.id === selectedItemId}
        />
      ))}
    </List>
  );

  return (
    <Box className={styles["list-box"]}>
      <Box className={styles.header}>
        <Text>{title}</Text>
        <ActionIcon
          variant="outline"
          size="xs"
          disabled={addIconDisable}
          onClick={() => setIsAdding(true)}
        >
          <IconComponent collection="tabler" name="plus" />
        </ActionIcon>
      </Box>
      <Divider />
      {isLoading ? (
        <Box className={styles["loading"]}>
          <Loader size="sm" />
        </Box>
      ) : (
        <>{!!messages && !isAdding ? messageBox : detailBox}</>
      )}
    </Box>
  );
}
