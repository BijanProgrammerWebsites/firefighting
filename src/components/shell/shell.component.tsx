import type { PropsWithChildren, ReactNode } from "react";

import { Container } from "@mantine/core";

import NavbarComponent from "@/components/shell/components/navbar/navbar.component";

import styles from "./shell.module.css";

type Props = PropsWithChildren;

export default function ShellComponent({ children }: Props): ReactNode {
  return (
    <Container className={styles.shell} size="xs">
      <main>{children}</main>
      <NavbarComponent className={styles.navbar} />
    </Container>
  );
}
