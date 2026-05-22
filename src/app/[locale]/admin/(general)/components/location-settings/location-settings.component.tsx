"use client";
import { ReactNode } from "react";

import { SimpleGrid } from "@mantine/core";

import SiteListBoxComponent from "@/admin/(general)/components/location-settings/site-list-box.component";
import UnitListBoxComponent from "@/admin/(general)/components/location-settings/unit-list-box.component";
import ZoneListBoxComponent from "@/admin/(general)/components/location-settings/zone-list-box.component";
import RefineryGeneralFormProvider from "@/admin/(general)/providers/refinery-general-form-provider";

export default function LocationSettingsComponent(): ReactNode {
  return (
    <RefineryGeneralFormProvider>
      <SimpleGrid cols={3}>
        <SiteListBoxComponent />
        <ZoneListBoxComponent />
        <UnitListBoxComponent />
      </SimpleGrid>
    </RefineryGeneralFormProvider>
  );
}
