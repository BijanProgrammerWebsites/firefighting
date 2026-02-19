import type { ReactNode } from "react";

import UserTableComponent from "@/admin/users/components/user-table/user-table.component";
import RefineryUserProvider from "@/admin/users/providers/refinery-user-provider";

export default function UsersPage(): ReactNode {
  return (
    <RefineryUserProvider>
      <UserTableComponent />
    </RefineryUserProvider>
  );
}
