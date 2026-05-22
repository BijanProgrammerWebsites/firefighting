import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import TemplateListComponent from "@/admin/templates/components/template-list/template-list.component";

export const generateMetadata = generateDynamicMetadata("AdminTemplatesPage");

export default async function TemplatesPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminTemplatesPage");

  return (
    <div>
      <ToolbarComponent
        title={t("title")}
        createHref="/admin/templates/create"
      />
      <TemplateListComponent />
    </div>
  );
}
