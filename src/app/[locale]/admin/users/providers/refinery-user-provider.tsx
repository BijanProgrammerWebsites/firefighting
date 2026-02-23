"use client";
import { PropsWithChildren, ReactNode, useState } from "react";

import { RefineryUserContext } from "@/admin/users/contexts/refinery-user-context";
import { EMPLOYEE_MOCK_DATA } from "@/admin/users/mock/user.mock";
import { AccessLevelType } from "@/admin/users/types/access-level.type";

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
          ? { ...user, role: newAccessLevel }
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
