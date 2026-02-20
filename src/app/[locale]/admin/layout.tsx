import { PropsWithChildren, ReactNode } from "react";

import ShellComponent from "@/admin/components/shell/shell.component";
import AdminGuard from "@/admin/guards/admin.guard";

type Props = PropsWithChildren;

export default async function AdminLayout({
  children,
}: Props): Promise<ReactNode> {
  return (
    <AdminGuard>
      <ShellComponent>{children}</ShellComponent>
    </AdminGuard>
  );
}
