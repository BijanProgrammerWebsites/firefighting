import type { ReactNode } from "react";

import { LoadingOverlay } from "@mantine/core";

export default function LoadingComponent(): ReactNode {
  return (
    <LoadingOverlay
      visible
      zIndex={999}
      overlayProps={{ bg: "var(--mantine-color-body)" }}
    />
  );
}
