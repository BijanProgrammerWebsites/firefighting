import type { ReactNode } from "react";

import {
  Box,
  Card,
  MantineStyleProps,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";

import { numberFormatter } from "@/utils/format.utils";

type Props = {
  title: string;
  value: number | undefined;
  color: MantineStyleProps["c"];
  isLoading?: boolean;
  icon: ReactNode;
};

export default function KpiChart({
  title,
  value,
  color,
  isLoading,
  icon,
}: Props): ReactNode {
  return (
    <Card withBorder radius="md">
      <Stack gap={0}>
        <Box
          style={(theme) => ({
            display: "grid",
            gridTemplateColumns: "auto minmax(0, 1fr)",
            alignItems: "center",
            gap: theme.spacing.md,
            textAlign: "end",
          })}
        >
          <Box c="dimmed" fz={24}>
            {icon}
          </Box>
          <Text c={color} fz="h1" fw={700}>
            {isLoading || value === undefined ? (
              <Skeleton
                component="span"
                display="block"
                width="100%"
                height="1lh"
              />
            ) : (
              numberFormatter.format(value)
            )}
          </Text>
        </Box>
        <Text c="dimmed" fz="xs">
          {title}
        </Text>
      </Stack>
    </Card>
  );
}
