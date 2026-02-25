import type { ReactNode } from "react";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import UserTableComponent from "@/admin/users/components/user-table/user-table.component";
import RefineryUserProvider from "@/admin/users/providers/refinery-user-provider";

export const generateMetadata = generateDynamicMetadata("AdminUsersPage");

export default function UsersPage(): ReactNode {
  return (
    <RefineryUserProvider>
      <UserTableComponent />
    </RefineryUserProvider>
  );
}
