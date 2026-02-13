import { PropsWithChildren, ReactNode } from "react";

import ShellComponent from "@/android/components/shell/shell.component";

type Props = PropsWithChildren;

export default async function AndroidLayout({
  children,
}: Props): Promise<ReactNode> {
  return <ShellComponent>{children}</ShellComponent>;
}
