"use client";

import { PropsWithChildren, ReactNode, useState } from "react";

import { ScopeType } from "@/android/(dashboard)/types/scope.type";

import { DashboardContext } from "../context/dashboard.context";

type Props = PropsWithChildren;

export default function DashboardProvider({ children }: Props): ReactNode {
  const [scope, setScope] = useState<ScopeType>({});

  const changeScope = (value: ScopeType): void => {
    setScope(value);
  };

  return (
    <DashboardContext value={{ scope, changeScope }}>
      {children}
    </DashboardContext>
  );
}
