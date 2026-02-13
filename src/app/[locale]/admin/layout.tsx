import { PropsWithChildren, ReactNode } from "react";

import ShellComponent from "@/admin/components/shell/shell.component";

type Props = PropsWithChildren;

export default async function AdminLayout({
  children,
}: Props): Promise<ReactNode> {
  return <ShellComponent>{children}</ShellComponent>;
}
