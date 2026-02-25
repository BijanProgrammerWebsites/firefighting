import { ReactNode } from "react";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import RefineryGeneralFormComponent from "@/admin/(general)/components/refinery-form/refinery-general-form.component";
import RefineryGeneralFormProvider from "@/admin/(general)/providers/refinery-general-form-provider";

export const generateMetadata = generateDynamicMetadata("AdminGeneralPage");

export default async function GeneralPage(): Promise<ReactNode> {
  return (
    <RefineryGeneralFormProvider>
      <RefineryGeneralFormComponent />
    </RefineryGeneralFormProvider>
  );
}
