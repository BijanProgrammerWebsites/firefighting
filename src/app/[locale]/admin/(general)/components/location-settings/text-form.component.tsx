import type { ReactNode } from "react";

import { ActionIcon, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

import IconComponent from "@/components/icon/icon.component";

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
      style={{ width: "100%" }}
      onSubmit={form.onSubmit(handleSubmit)}
      onReset={handleCancel}
    >
      <Group>
        <TextInput
          size="xs"
          flex={1}
          key={form.key("name")}
          {...form.getInputProps("name")}
        />
        <Group gap={0}>
          <ActionIcon type="submit" variant="subtle" color="gray" size="sm">
            <IconComponent collection="tabler" name="check" />
          </ActionIcon>
          <ActionIcon type="reset" variant="subtle" color="gray" size="sm">
            <IconComponent collection="tabler" name="x" />
          </ActionIcon>
        </Group>
      </Group>
    </form>
  );
}
