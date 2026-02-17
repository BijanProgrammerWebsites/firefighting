import type { ReactNode } from "react";

import { ActionIcon } from "@mantine/core";

import IconComponent from "@/components/icon/icon.component";

import styles from "./remove-item.module.css";

type Props = {
  onSuccess: () => void;
  onCancel: () => void;
};
export default function RemoveItemComponent({
  onSuccess,
  onCancel,
}: Props): ReactNode {
  return (
    <div className={styles["remove-item"]}>
      آیا از حذف این مورد اطمینان دارید؟
      <ActionIcon
        type="submit"
        variant="filled"
        color="green"
        size="xs"
        onClick={onSuccess}
      >
        <IconComponent
          collection="tabler"
          name="check"
          width={16}
          height={16}
        />
      </ActionIcon>
      <ActionIcon
        type="reset"
        variant="filled"
        color="red"
        size="xs"
        onClick={onCancel}
      >
        <IconComponent
          collection="tabler"
          name="playstation-x"
          width={16}
          height={16}
        />
      </ActionIcon>
    </div>
  );
}
