import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { Box } from "@mantine/core";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import StandardEditComponent from "@/admin/standards/components/standard-edit.component";

export const generateMetadata = generateDynamicMetadata("AdminStandardsPage");

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditStandardPage({
  params,
}: Props): Promise<ReactNode> {
  const { id } = await params;

  const t = await getTranslations("AdminStandardsPage");

  return (
    <Box>
      <ToolbarComponent title={t("edit")} parentHref="/admin/standards" />
      <StandardEditComponent id={id} />
    </Box>
  );
}
