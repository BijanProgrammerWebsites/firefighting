import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Badge, Card, Group, Text } from "@mantine/core";

import { OverdueDtoItem } from "@/api/dashboard/overdue.api";

import IconComponent from "@/components/icon/icon.component";

import { dateFormatter } from "@/utils/format.utils";
import { EquipmentStatusToColor } from "@/utils/map.utils";

type Props = {
  item: OverdueDtoItem;
};

export default function OverdueInspectionCardComponent({
  item,
}: Props): ReactNode {
  const tCommon = useTranslations("Common");
  const t = useTranslations("DashboardPage");

  const color = EquipmentStatusToColor[item.inspection.status];

  return (
    <Card
      withBorder
      component="a"
      href={`/inspections/create/${item.inspection.equipment.id}`}
      mb="sm"
      radius="md"
    >
      <Group justify="space-between">
        <Text c={color} size="md" fw={500}>
          {item.inspection.equipment.title}
        </Text>
        <Badge variant="light" color={color}>
          {tCommon(item.inspection.status)}
        </Badge>
      </Group>
      <Group gap="xs" mt="xs">
        <IconComponent name="map-point-linear" />
        <Text c="dimmed" size="sm">
          {tCommon("locatedIn") + " "}
          {item.inspection.equipment.unit.zone.site.title}
          {tCommon("comma") + " "}
          {item.inspection.equipment.unit.zone.title}
          {tCommon("comma") + " "}
          {item.inspection.equipment.unit.title}
        </Text>
      </Group>
      <Group gap="xs" mt="xs">
        <IconComponent name="add-square-linear" />
        <Text c="dimmed" size="sm">
          {t("lastInspectionAt") + " "}
          {dateFormatter.format(new Date(item.inspection.createdDate))}
        </Text>
      </Group>
      <Group gap="xs" mt="xs">
        <IconComponent name="alarm-remove-linear" />
        <Text c="dimmed" size="sm">
          {item.daysPassedSinceDeadline + +" "}
          {t("daysArePassedSinceDeadline")}
        </Text>
      </Group>
    </Card>
  );
}
