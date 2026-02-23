"use client";
import { createContext } from "react";

import { AccessLevelType } from "@/admin/users/types/access-level.type";
import { UserType } from "@/admin/users/types/user.type";

type ContextType = {
  users: UserType[];
  updateUserAccessLevel: (
    userId: string,
    newAccessLevel: AccessLevelType,
  ) => void;
};
export const RefineryUserContext = createContext<ContextType>({
  users: [],
  updateUserAccessLevel: () => {},
});
