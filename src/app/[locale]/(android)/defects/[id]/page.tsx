import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { Box } from "@mantine/core";

import ToolbarComponent from "@/components/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import DefectEditComponent from "@/android/defects/components/defect-edit.component";

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
    <Box>
      <ToolbarComponent title={t("edit")} parentHref="/defects" />
      <DefectEditComponent id={id} />
    </Box>
  );
}
