import type { ReactNode } from "react";

import { Box, Card, Group, Stack, Text } from "@mantine/core";

import { StatusEnum } from "@/enums/status.enum";

import { numberFormatter } from "@/utils/format.utils";
import { KpiStatusToColor } from "@/utils/map.utils";

type Props = {
  title: string;
  value: number;
  status: StatusEnum;
  icon: ReactNode;
};

export default function KpiChart({
  title,
  value,
  status,
  icon,
}: Props): ReactNode {
  return (
    <Card radius="md" withBorder color="red" variant="">
      <Group align="start">
        <Box c="dimmed" fz={36}>
          {icon}
        </Box>
        <Stack gap={0}>
          <Text c={KpiStatusToColor[status]} fz="h1" fw={700}>
            {numberFormatter.format(value)}
          </Text>
          <Text c="dimmed" fz="xs">
            {title}
          </Text>
        </Stack>
      </Group>
    </Card>
  );
}
