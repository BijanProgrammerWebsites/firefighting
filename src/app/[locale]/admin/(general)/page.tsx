import { ReactNode } from "react";

import RefineryGeneralFormComponent from "@/admin/(general)/components/refinery-form/refinery-general-form.component";
import RefineryGeneralFormProvider from "@/admin/(general)/providers/refineryGeneralFormProvider";

export default async function GeneralPage(): Promise<ReactNode> {
  return (
    <RefineryGeneralFormProvider>
      <RefineryGeneralFormComponent />
    </RefineryGeneralFormProvider>
  );
}
