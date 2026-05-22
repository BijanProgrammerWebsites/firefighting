import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import UserFormComponent from "@/admin/users/components/user-form/user-form.component";

export const generateMetadata = generateDynamicMetadata("AdminUsersPage");

export default async function CreateUserPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminUsersPage");

  return (
    <div>
      <ToolbarComponent title={t("create")} parentHref="/admin/users" />
      <UserFormComponent />
    </div>
  );
}
