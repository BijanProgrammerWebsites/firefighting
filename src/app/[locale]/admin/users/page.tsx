import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { Box } from "@mantine/core";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import UserListComponent from "@/admin/users/components/user-list.component";

export const generateMetadata = generateDynamicMetadata("AdminUsersPage");

export default async function UsersPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminUsersPage");

  return (
    <Box>
      <ToolbarComponent title={t("title")} createHref="/admin/users/create" />
      <UserListComponent />
    </Box>
  );
}
