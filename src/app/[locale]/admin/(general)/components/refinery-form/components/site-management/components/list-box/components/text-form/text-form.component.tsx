import type { FormEvent, ReactNode } from "react";

import { ActionIcon, TextInput } from "@mantine/core";

import IconComponent from "@/components/icon/icon.component";

import styles from "./text-form.module.css";

type Props = {
  defaultValue?: string;
  onChangeValue: (value: string) => void;
  onCancelValueChange: () => void;
};
export default function TextFormComponent({
  defaultValue,
  onChangeValue,
  onCancelValueChange,
}: Props): ReactNode {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.currentTarget);
    const newValue = formData.get("name")?.toString().trim();

    if (newValue) {
      onChangeValue(newValue);
    } else {
      handleReset(e);
    }
  };
  const handleReset = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    e.currentTarget.reset();
    onCancelValueChange();
  };
  return (
    <form
      className={styles["text-form"]}
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <TextInput name="name" defaultValue={defaultValue} />
      <ActionIcon type="submit" variant="filled" color="green" size="xs">
        <IconComponent
          collection="tabler"
          name="check"
          width={16}
          height={16}
        />
      </ActionIcon>
      <ActionIcon type="reset" variant="filled" color="red" size="xs">
        <IconComponent
          collection="tabler"
          name="playstation-x"
          width={16}
          height={16}
        />
      </ActionIcon>
    </form>
  );
}
