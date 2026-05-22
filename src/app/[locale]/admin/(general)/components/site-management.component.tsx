"use client";
import { ReactNode } from "react";

import { Box } from "@mantine/core";

import SiteListBoxComponent from "@/admin/(general)/components/site-list-box.component";
import UnitListBoxComponent from "@/admin/(general)/components/unit-list-box.component";
import ZoneListBoxComponent from "@/admin/(general)/components/zone-list-box.component";
import RefineryGeneralFormProvider from "@/admin/(general)/providers/refinery-general-form-provider";

export default function SiteManagementComponent(): ReactNode {
  return (
    <RefineryGeneralFormProvider>
      <Box>
        <SiteListBoxComponent />
        <ZoneListBoxComponent />
        <UnitListBoxComponent />
      </Box>
    </RefineryGeneralFormProvider>
  );
}
