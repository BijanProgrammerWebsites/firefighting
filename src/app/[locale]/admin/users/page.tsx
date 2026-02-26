import type { ReactNode } from "react";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import UserTableComponent from "@/admin/users/components/user-table/user-table.component";

export const generateMetadata = generateDynamicMetadata("AdminUsersPage");

export default function UsersPage(): ReactNode {
  return <UserTableComponent />;
}
