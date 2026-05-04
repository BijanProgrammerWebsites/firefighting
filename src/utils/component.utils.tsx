import {
  NumberInputProps,
  SelectProps,
  TableThProps,
  TextInputProps,
} from "@mantine/core";

import IconComponent from "@/components/icon/icon.component";

export const ROW_COLUMN_PROPS: Partial<TableThProps> = {
  styles: { th: { verticalAlign: "top" } },
};

export const TEXT_FILTER_PROPS: Partial<TextInputProps> = {
  size: "xs",
  styles: { root: { maxInlineSize: "30ch" } },
  leftSection: <IconComponent name="filter-linear" />,
};

export const NUMBER_FILTER_PROPS: Partial<NumberInputProps> = {
  size: "xs",
  styles: { root: { maxInlineSize: "30ch" } },
  leftSection: <IconComponent name="filter-linear" />,
};

export const SELECT_FILTER_PROPS: Partial<SelectProps> = {
  searchable: true,
  withAlignedLabels: true,
  clearable: true,
  size: "xs",
  styles: { root: { maxInlineSize: "30ch" } },
  leftSection: <IconComponent name="filter-linear" />,
};
