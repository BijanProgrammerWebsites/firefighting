import type { ReactNode } from "react";

import { ActionIcon, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import IconComponent from "@/components/icon/icon.component";

import styles from "./text-form.module.css";

type Props = {
  defaultValue?: string;
  onSubmit: (value: string) => void;
  onCancel: () => void;
};
export default function TextFormComponent({
  defaultValue,
  onSubmit,
  onCancel,
}: Props): ReactNode {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: defaultValue,
    },
  });
  const handleSubmit = (values: { name: string | undefined }): void => {
    if (values["name"]) {
      onSubmit(values["name"]);
    } else {
      handleCancel();
    }
  };
  const handleCancel = (): void => {
    form.reset();
    onCancel();
  };

  return (
    <form
      className={styles["text-form"]}
      onSubmit={form.onSubmit(handleSubmit)}
      onReset={handleCancel}
    >
      <TextInput key={form.key("name")} {...form.getInputProps("name")} />
      <ActionIcon type="submit" variant="filled" color="green" size="xs">
        <IconComponent collection="tabler" name="check" />
      </ActionIcon>
      <ActionIcon type="reset" variant="filled" color="red" size="xs">
        <IconComponent collection="tabler" name="x" />
      </ActionIcon>
    </form>
  );
}
