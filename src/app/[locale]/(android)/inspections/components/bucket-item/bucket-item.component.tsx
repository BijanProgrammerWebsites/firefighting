import type { ReactNode } from "react";

import { useTranslations } from "next-intl";


import { Badge, Card, Group, Text } from "@mantine/core";

import { BucketItem } from "@/api/equipments/find-all-buckets.api";

import { dateFormatter } from "@/utils/format.utils";
import { StatusToColor } from "@/utils/map.utils";

import styles from "./bucket-item.module.css";

type Props = {
  item: BucketItem;
};

export default function BucketItemComponent({ item }: Props): ReactNode {
  const tCommon = useTranslations("Common");
  const t = useTranslations("InspectionsPage");

  const status = item.lastInspection?.status || "ok";
  const lastDate = item.lastInspection?.createdDate;
  const nextDate = item.nextInspectionAt;

  return (
    <Card
      key={item.equipment.id}
      withBorder
      component="a"
      c={StatusToColor[status]}
      href={`/inspections/create/${item.equipment.id}`}
      mb="sm"
    >
      <Group justify="space-between">
        <Text size="md" fw={500}>
          {item.equipment.title}
        </Text>
        <Badge w="10ch" color={StatusToColor[status]}>
          {tCommon(status)}
        </Badge>
      </Group>
      <Text c="dimmed" size="sm" mt="xs">
        {t("lastInspection")}:{" "}
        {lastDate ? dateFormatter.format(new Date(lastDate)) : "ناموجود"}
      </Text>
      <Text c="dimmed" size="sm" mt="xs">
        {t("nextInspection")}:{" "}
        {nextDate ? dateFormatter.format(new Date(nextDate)) : "ناموجود"}
      </Text>
    </Card>
  );
}
