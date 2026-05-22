import { ReactNode, useState } from "react";

import {
  ActionIcon,
  Card,
  Center,
  Divider,
  Group,
  Loader,
  Stack,
  Text,
} from "@mantine/core";

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

  const detailBox = (
    <Stack gap={4}>
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
    </Stack>
  );

  return (
    <Card withBorder radius="md">
      <Stack gap="md" h="20rem">
        <Group justify="space-between">
          <Text>{title}</Text>
          <ActionIcon
            variant="outline"
            size="xs"
            disabled={addIconDisable}
            onClick={() => setIsAdding(true)}
          >
            <IconComponent collection="tabler" name="plus" />
          </ActionIcon>
        </Group>
        <Divider />
        {isLoading ? (
          <Center>
            <Loader size="sm" />
          </Center>
        ) : (
          <>
            {!!messages && !isAdding ? (
              <Center h="100%">{messages}</Center>
            ) : (
              detailBox
            )}
          </>
        )}
      </Stack>
    </Card>
  );
}
