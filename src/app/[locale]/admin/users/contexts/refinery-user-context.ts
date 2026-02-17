"use client";
import { Dispatch, SetStateAction, createContext } from "react";

import { RefineryActionType } from "@/admin/(general)/reducers/refinery.reducer";
import RefineryType from "@/admin/(general)/types/refinery.type";
import { AccessLevelType } from "@/admin/users/components/types/access-level.type";
import { UserType } from "@/admin/users/components/types/user.type";

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
