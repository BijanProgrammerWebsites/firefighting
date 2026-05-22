import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import DefectListComponent from "@/android/defects/components/defect-list/defect-list.component";

export const generateMetadata = generateDynamicMetadata("DefectsPage");

export default async function DefectsPage(): Promise<ReactNode> {
  const t = await getTranslations("DefectsPage");

  return (
    <div>
      <ToolbarComponent title={t("title")} />
      <DefectListComponent />
    </div>
  );
}
