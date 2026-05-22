import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { Box } from "@mantine/core";

import ToolbarComponent from "@/components/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import InspectionCreateComponent from "@/android/inspections/components/inspection-create.component";

export const generateMetadata = generateDynamicMetadata("AdminTemplatesPage");

type Props = {
  params: Promise<{ equipmentId: string }>;
};

export default async function CreateInspectionPage({
  params,
}: Props): Promise<ReactNode> {
  const { equipmentId } = await params;

  const t = await getTranslations("InspectionsPage");

  return (
    <Box>
      <ToolbarComponent title={t("create")} parentHref="/inspections" />
      <InspectionCreateComponent equipmentId={equipmentId} />
    </Box>
  );
}
