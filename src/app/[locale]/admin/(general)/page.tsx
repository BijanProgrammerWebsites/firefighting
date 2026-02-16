import { ReactNode } from "react";

import RefineryFormComponent from "@/admin/(general)/components/refinery-form/refinery-form.component";
import RefineryProvider from "@/admin/(general)/providers/refinery.provider";

export default async function GeneralPage(): Promise<ReactNode> {
  return (
    <RefineryProvider>
      <RefineryFormComponent />
    </RefineryProvider>
  );
}
