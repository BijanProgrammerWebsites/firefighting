import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import StandardListComponent from "@/admin/standards/components/standard-list.component";

export const generateMetadata = generateDynamicMetadata("AdminStandardsPage");

export default async function StandardsPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminStandardsPage");

  return (
    <div>
      <ToolbarComponent
        title={t("title")}
        createHref="/admin/standards/create"
      />
      <StandardListComponent />
    </div>
  );
}
