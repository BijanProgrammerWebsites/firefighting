import type { ReactNode } from "react";

import { Group } from "@mantine/core";

type Props = {
  className?: string;
};

export default function HeaderComponent({ className }: Props): ReactNode {
  return (
    <Group
      className={className}
      bg="var(--mantine-color-body)"
      h="100%"
      px="md"
    >
      Header
    </Group>
  );
}
