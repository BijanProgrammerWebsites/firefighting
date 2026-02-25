import { PropsWithChildren, ReactNode } from "react";

import ShellComponent from "@/auth/components/shell/shell.component";

type Props = PropsWithChildren;

export default async function AuthLayout({
  children,
}: Props): Promise<ReactNode> {
  return <ShellComponent>{children}</ShellComponent>;
}
