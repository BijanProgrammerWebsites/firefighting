import type { ReactNode } from "react";

import { ActionIcon, Dialog, Divider } from "@mantine/core";

import IconComponent from "@/components/icon/icon.component";

import styles from "./remove-item-dialog.module.css";

type Props = {
  opened: boolean;
  onSuccess: () => void;
  onCancel: () => void;
};
export default function RemoveItemDialogComponent({
  opened,
  onSuccess,
  onCancel,
}: Props): ReactNode {
  return (
    <Dialog
      opened={opened}
      className={styles["remove-item"]}
      position={{ top: 20, left: "45%" }}
    >
      آیا از حذف این مورد اطمینان دارید؟
      <Divider />
      <ActionIcon
        type="submit"
        variant="filled"
        color="green"
        size="xs"
        onClick={onSuccess}
      >
        <IconComponent collection="tabler" name="check" />
      </ActionIcon>
      <ActionIcon
        type="reset"
        variant="filled"
        color="red"
        size="xs"
        onClick={onCancel}
      >
        <IconComponent collection="tabler" name="x" />
      </ActionIcon>
    </Dialog>
  );
}
