import { PropsWithChildren, ReactNode } from "react";

import ShellComponent from "@/android/components/shell/shell.component";
import AndroidGuard from "@/android/guards/android.guard";

type Props = PropsWithChildren;

export default async function AndroidLayout({
  children,
}: Props): Promise<ReactNode> {
  return (
    <AndroidGuard>
      <ShellComponent>{children}</ShellComponent>
    </AndroidGuard>
  );
}
