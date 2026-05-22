import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import DefectEditComponent from "@/android/defects/components/defect-edit/defect-edit.component";

export const generateMetadata = generateDynamicMetadata("DefectsPage");

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditDefectPage({
  params,
}: Props): Promise<ReactNode> {
  const { id } = await params;

  const t = await getTranslations("DefectsPage");

  return (
    <div>
      <ToolbarComponent title={t("edit")} parentHref="/defects" />
      <DefectEditComponent id={id} />
    </div>
  );
}
