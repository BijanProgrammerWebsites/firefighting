import type { PropsWithChildren, ReactNode } from "react";

import { Container } from "@mantine/core";

import HeaderComponent from "@/android/components/shell/components/header/header.component";
import NavbarComponent from "@/android/components/shell/components/navbar/navbar.component";

import styles from "./shell.module.css";

type Props = PropsWithChildren;

export default function ShellComponent({ children }: Props): ReactNode {
  return (
    <Container className={styles.shell} size="xs">
      <HeaderComponent className={styles.header} />
      <main>{children}</main>
      <NavbarComponent className={styles.navbar} />
    </Container>
  );
}
