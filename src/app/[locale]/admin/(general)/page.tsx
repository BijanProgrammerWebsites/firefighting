import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { Stack } from "@mantine/core";

import ToolbarComponent from "@/components/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import RefineryFormComponent from "@/admin/(general)/components/refinery-form.component";
import SiteManagementComponent from "@/admin/(general)/components/site-management.component";

export const generateMetadata = generateDynamicMetadata("AdminGeneralPage");

export default async function GeneralPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminGeneralPage");

  return (
    <Stack>
      <ToolbarComponent title={t("title")} subtitle={t("subtitle")} />
      <Stack gap="xl">
        <RefineryFormComponent />
        <SiteManagementComponent />
      </Stack>
    </Stack>
  );
}
