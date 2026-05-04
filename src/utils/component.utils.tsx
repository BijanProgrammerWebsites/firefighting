import { TableThProps } from "@mantine/core";

import IconComponent from "@/components/icon/icon.component";

export const ROW_COLUMN_PROPS: Partial<TableThProps> = {
  styles: { th: { verticalAlign: "top" } },
};

export const FILTER_PROPS = {
  size: "xs",
  styles: { root: { maxInlineSize: "30ch" } },
  leftSection: <IconComponent name="filter-linear" />,
};
