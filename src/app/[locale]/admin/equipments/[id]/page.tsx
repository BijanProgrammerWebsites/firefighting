import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { Box } from "@mantine/core";

import ToolbarComponent from "@/components/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import EquipmentEditComponent from "@/admin/equipments/components/equipment-edit.component";

export const generateMetadata = generateDynamicMetadata("AdminEquipmentsPage");

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditEquipmentPage({
  params,
}: Props): Promise<ReactNode> {
  const { id } = await params;

  const t = await getTranslations("AdminEquipmentsPage");

  return (
    <Box>
      <ToolbarComponent title={t("edit")} parentHref="/admin/equipments" />
      <EquipmentEditComponent id={id} />
    </Box>
  );
}
