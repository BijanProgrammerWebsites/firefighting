"use client";

import type { PropsWithChildren, ReactNode } from "react";

import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import HeaderComponent from "@/admin/components/shell/components/header/header.component";
import NavbarComponent from "@/admin/components/shell/components/navbar/navbar.component";

type Props = PropsWithChildren;

export default function ShellComponent({ children }: Props): ReactNode {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 200,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <HeaderComponent opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar>
        <NavbarComponent />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
