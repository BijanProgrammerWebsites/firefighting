import type { ReactNode } from "react";

import { useTranslations } from "next-intl";

import { Badge, Card, Group, Text } from "@mantine/core";

import { Defect } from "@/entities/defect";

import { SeverityToColor } from "@/utils/map.utils";

type Props = {
  defect: Defect;
};

export default function DefectCardComponent({ defect }: Props): ReactNode {
  const tCommon = useTranslations("Common");

  const color = SeverityToColor[defect.severity];

  return (
    <Card
      withBorder
      component="a"
      c={color}
      href={`/defects/${defect.id}`}
      mb="sm"
      radius="xl"
    >
      <Group justify="space-between">
        <Text size="md" fw={500}>
          {defect.title || defect.answer.text || defect.answer.question.title}
        </Text>
        <Badge color={color}>{tCommon(defect.severity)}</Badge>
      </Group>
    </Card>
  );
}
