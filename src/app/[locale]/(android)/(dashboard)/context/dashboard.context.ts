import { createContext } from "react";

import { ScopeType } from "@/android/(dashboard)/types/scope.type";

type ContextValue = {
  scope: ScopeType;
  changeScope: (value: ScopeType) => void;
};

export const DashboardContext = createContext<ContextValue>({} as ContextValue);
