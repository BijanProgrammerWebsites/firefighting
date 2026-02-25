import type { ReactElement } from "react";

import { Icon, type IconProps } from "@iconify/react";

import clsx from "clsx";

import styles from "./icon.module.css";

type Props = Omit<IconProps, "icon" | "ssr" | "color"> & {
  collection?: "solar" | "tabler";
  name: string;
  size?: "inherit" | "lg";
};

export default function IconComponent({
  collection = "solar",
  name,
  size = "inherit",
  inline = true,
  className,
  ...otherProps
}: Props): ReactElement {
  const iconId = `${collection}:${name}`;

  return (
    <Icon
      icon={iconId}
      className={clsx(styles.icon, styles[size], className)}
      inline={inline}
      {...otherProps}
    />
  );
}
