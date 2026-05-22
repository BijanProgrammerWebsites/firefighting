import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Badge, Card, Group, Text } from "@mantine/core";

import { Equipment } from "@/entities/equipment";

import { EquipmentStatusToColor } from "@/utils/map.utils";

type Props = {
  equipment: Equipment;
};

export default function CriticalEquipmentsCardComponent({
  equipment,
}: Props): ReactNode {
  const tCommon = useTranslations("Common");

  const color = EquipmentStatusToColor[equipment.status];

  return (
    <Card
      withBorder
      component="a"
      href={`/inspections/create/${equipment.id}`}
      mb="sm"
      radius="md"
    >
      <Group justify="space-between">
        <Text c={color} size="md" fw={500}>
          {equipment.title}
        </Text>
        <Badge variant="light" color={color}>
          {tCommon(equipment.status)}
        </Badge>
      </Group>
    </Card>
  );
}
