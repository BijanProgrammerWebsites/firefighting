import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { Box } from "@mantine/core";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import UserEditComponent from "@/admin/users/components/user-edit.component";

export const generateMetadata = generateDynamicMetadata("AdminUsersPage");

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditUserPage({
  params,
}: Props): Promise<ReactNode> {
  const { id } = await params;

  const t = await getTranslations("AdminUsersPage");

  return (
    <Box>
      <ToolbarComponent title={t("edit")} parentHref="/admin/users" />
      <UserEditComponent id={id} />
    </Box>
  );
}
