import type { PropsWithChildren, ReactNode } from "react";

import HeaderComponent from "@/auth/components/shell/components/header/header.component";
import { Container } from "@mantine/core";

import styles from "./shell.module.css";

type Props = PropsWithChildren;

export default function ShellComponent({ children }: Props): ReactNode {
  return (
    <Container className={styles.shell} size="xs">
      <HeaderComponent className={styles.header} />
      <main>{children}</main>
    </Container>
  );
}
