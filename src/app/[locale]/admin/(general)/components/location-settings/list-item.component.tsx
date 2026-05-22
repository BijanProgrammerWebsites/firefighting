import { ReactNode, useState } from "react";

import { useTranslations } from "next-intl";

import { ActionIcon, Group, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { modals } from "@mantine/modals";

import IconComponent from "@/components/icon/icon.component";

import TextFormComponent from "@/admin/(general)/components/location-settings/text-form.component";
import { ListItemType } from "@/admin/(general)/types/list-item.type";

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

  const { ref, hovered } = useHover();

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
    <Group
      ref={ref}
      align="center"
      justify="space-between"
      bg={selected ? "gray.1" : hovered ? "gray.1" : undefined}
      p={8}
      style={{ borderRadius: 8, cursor: "pointer" }}
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
        <Group gap={0}>
          <ActionIcon
            variant="subtle"
            color="gray"
            size="sm"
            onClick={() => setMode("edit")}
          >
            <IconComponent name="pen-linear" />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="gray"
            size="sm"
            onClick={handleRemoveMode}
          >
            <IconComponent name="trash-bin-trash-linear" />
          </ActionIcon>
        </Group>
      )}
    </Group>
  );
}
