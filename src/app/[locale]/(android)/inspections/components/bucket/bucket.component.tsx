import type { ReactNode } from "react";

import { Box, Divider } from "@mantine/core";

import { BucketItem } from "@/api/equipments/find-all-buckets.api";

import BucketItemComponent from "@/android/inspections/components/bucket-item/bucket-item.component";

type Props = {
  title: string;
  items: BucketItem[];
};

export default function BucketComponent({ title, items }: Props): ReactNode {
  if (items.length === 0) {
    return null;
  }

  return (
    <Box mb="xl">
      <Divider my="xs" label={title} labelPosition="left" />
      {items.map((item) => (
        <BucketItemComponent key={item.equipment.id} item={item} />
      ))}
    </Box>
  );
}
