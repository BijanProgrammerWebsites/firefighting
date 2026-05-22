import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { Box } from "@mantine/core";

import ToolbarComponent from "@/components/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import UserFormComponent from "@/admin/users/components/user-form.component";

export const generateMetadata = generateDynamicMetadata("AdminUsersPage");

export default async function CreateUserPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminUsersPage");

  return (
    <Box>
      <ToolbarComponent title={t("create")} parentHref="/admin/users" />
      <UserFormComponent />
    </Box>
  );
}
