import { ReactNode, useState } from "react";

import { ActionIcon, Box, Divider, List, Loader, Text } from "@mantine/core";

import IconComponent from "@/components/icon/icon.component";

import ListItemComponent from "@/admin/(general)/components/location-settings/list-item.component";
import TextFormComponent from "@/admin/(general)/components/location-settings/text-form.component";
import { ListItemType } from "@/admin/(general)/types/list-item.type";

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

  const messageBox = <Box>{messages}</Box>;
  const detailBox = (
    <List>
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
    <Box>
      <Box>
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
        <Box>
          <Loader size="sm" />
        </Box>
      ) : (
        <>{!!messages && !isAdding ? messageBox : detailBox}</>
      )}
    </Box>
  );
}
