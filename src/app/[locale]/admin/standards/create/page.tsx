import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import StandardFormComponent from "@/admin/standards/components/standard-form/standard-form.component";

export const generateMetadata = generateDynamicMetadata("AdminStandardsPage");

export default async function CreateStandardPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminStandardsPage");

  return (
    <div>
      <ToolbarComponent title={t("create")} parentHref="/admin/standards" />
      <StandardFormComponent />
    </div>
  );
}
