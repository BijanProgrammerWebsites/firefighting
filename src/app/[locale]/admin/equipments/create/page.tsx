import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { Box } from "@mantine/core";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import EquipmentFormComponent from "@/admin/equipments/components/equipment-form.component";

export const generateMetadata = generateDynamicMetadata("AdminEquipmentsPage");

export default async function CreateEquipmentPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminEquipmentsPage");

  return (
    <Box>
      <ToolbarComponent title={t("create")} parentHref="/admin/equipments" />
      <EquipmentFormComponent />
    </Box>
  );
}
