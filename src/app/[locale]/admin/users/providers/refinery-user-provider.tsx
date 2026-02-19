"use client";
import { PropsWithChildren, ReactNode, useReducer, useState } from "react";

import { AccessLevelType } from "@/admin/users/components/types/access-level.type";
import { RefineryUserContext } from "@/admin/users/contexts/refinery-user-context";
import { EMPLOYEE_MOCK_DATA } from "@/admin/users/mock/user.mock";

type Props = PropsWithChildren;

const RefineryUserProvider = ({ children }: Props): ReactNode => {
  const [users, setUsers] = useState(EMPLOYEE_MOCK_DATA);

  const updateUserAccessLevel = (
    userId: string,
    newAccessLevel: AccessLevelType,
  ): void => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id.toString() === userId
          ? { ...user, accessLevel: newAccessLevel }
          : user,
      ),
    );
  };

  return (
    <RefineryUserContext
      value={{
        users,
        updateUserAccessLevel,
      }}
    >
      {children}
    </RefineryUserContext>
  );
};
export default RefineryUserProvider;
