import { ReactElement } from "react";

import { Icon, IconProps } from "@iconify/react";

import { useIconHook } from "@/components/icon/hooks/use-icon.hook";
import { IconCollection } from "@/components/icon/types/icon-collection.type";

type Props = Omit<IconProps, "icon" | "ssr" | "color"> & {
  collection?: IconCollection;
  name: string;
  size?: "inherit" | "lg";
};

export default function IconComponent({
  collection = "solar",
  name,
  size = "inherit",
  inline = true,
  ...otherProps
}: Props): ReactElement {
  const iconData = useIconHook(collection, name);

  if (!iconData) {
    console.error(`Icon "${name}" is missing.`);

    return (
      <svg
        width="1em"
        height="1em"
        aria-hidden="true"
        viewBox="0 0 24 24"
      ></svg>
    );
  }

  return (
    <Icon
      ssr
      icon={iconData}
      inline={inline}
      fontSize={size === "lg" ? "1.5em" : undefined}
      {...otherProps}
    />
  );
}
