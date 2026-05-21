import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Badge, Card, Group, Text } from "@mantine/core";

import { BucketItem } from "@/api/equipments/find-all-buckets.api";

import { EquipmentStatusEnum } from "@/enums/equipment-status.enum";

import { dateFormatter } from "@/utils/format.utils";
import { EquipmentStatusToColor } from "@/utils/map.utils";

type Props = {
  item: BucketItem;
};

export default function BucketItemComponent({ item }: Props): ReactNode {
  const tCommon = useTranslations("Common");
  const t = useTranslations("InspectionsPage");

  const status = item.inspection.status || EquipmentStatusEnum.IN_SERVICE;
  const color = EquipmentStatusToColor[status];

  const lastDate = item.inspection.createdDate;
  const nextDate = item.nextInspectionAt;

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
        <Badge variant="light" color={EquipmentStatusToColor[status]}>
          {tCommon(status)}
        </Badge>
      </Group>
      <Text c="dimmed" size="sm" mt="xs">
        {t("lastInspection")}: {dateFormatter.format(new Date(lastDate))}
      </Text>
      <Text c="dimmed" size="sm" mt="xs">
        {t("nextInspection")}: {dateFormatter.format(new Date(nextDate))}
      </Text>
    </Card>
  );
}
