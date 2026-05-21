import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Badge, Card, Group, Text } from "@mantine/core";

import IconComponent from "@/components/icon/icon.component";

import { Defect } from "@/entities/defect";

import { dateTimeFormatter } from "@/utils/format.utils";
import {
  DefectStatusToColor,
  EquipmentStatusToColor,
  MaintenanceStatusToColor,
  SeverityToColor,
} from "@/utils/map.utils";

type Props = {
  defect: Defect;
};

export default function DefectCardComponent({ defect }: Props): ReactNode {
  const tCommon = useTranslations("Common");
  const t = useTranslations("DefectsPage");

  const color = SeverityToColor[defect.severity];

  return (
    <Card
      withBorder
      component="a"
      href={`/defects/${defect.id}`}
      mb="sm"
      radius="md"
    >
      <Group justify="space-between">
        <Text c={color} size="md" fw={500}>
          {defect.title || defect.answer.text || defect.answer.question.title}
        </Text>
        <Badge variant="light" color={color}>
          {tCommon(defect.severity)}
        </Badge>
      </Group>
      {defect.description && (
        <Text c="dimmed" size="sm" mt="xs">
          {defect.description}
        </Text>
      )}
      <Group gap="xs" mt="xs">
        <IconComponent name="map-point-linear" />
        <Text c="dimmed" size="sm">
          {defect.equipment.title + " "}
          {t("locatedIn") + " "}
          {defect.equipment.unit.zone.site.title}
          {tCommon("comma") + " "}
          {defect.equipment.unit.zone.title}
          {tCommon("comma") + " "}
          {defect.equipment.unit.title}
        </Text>
      </Group>
      <Group gap="xs" mt="xs">
        <IconComponent name="add-square-linear" />
        <Text c="dimmed" size="sm">
          {tCommon("createdAt") + " "}
          {dateTimeFormatter.format(new Date(defect.createdDate))}
        </Text>
      </Group>
      {defect.updatedDate !== defect.createdDate && (
        <Group gap="xs" mt="xs">
          <IconComponent name="pen-new-square-linear" />
          <Text c="dimmed" size="sm">
            {tCommon("updatedAt") + " "}
            {dateTimeFormatter.format(new Date(defect.updatedDate))}
          </Text>
        </Group>
      )}
      <Group mt="xs">
        <Badge variant="dot" color={DefectStatusToColor[defect.status]}>
          {tCommon(defect.status)}
        </Badge>
        <Badge
          variant="dot"
          color={MaintenanceStatusToColor[defect.maintenanceStatus]}
        >
          {tCommon(defect.maintenanceStatus)}
        </Badge>
        <Badge
          variant="dot"
          color={EquipmentStatusToColor[defect.equipment.status]}
        >
          {tCommon(defect.equipment.status)}
        </Badge>
      </Group>
    </Card>
  );
}
