import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { Stack } from "@mantine/core";

import ToolbarComponent from "@/components/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import LocationSettingsComponent from "@/admin/(general)/components/location-settings/location-settings.component";
import RefineryFormComponent from "@/admin/(general)/components/refinery-form/refinery-form.component";

export const generateMetadata = generateDynamicMetadata("AdminGeneralPage");

export default async function GeneralPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminGeneralPage");

  return (
    <Stack>
      <ToolbarComponent title={t("title")} subtitle={t("subtitle")} />
      <Stack gap="xl">
        <RefineryFormComponent />
        <LocationSettingsComponent />
      </Stack>
    </Stack>
  );
}
