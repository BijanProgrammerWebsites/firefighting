import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import InspectionCreateComponent from "@/android/inspections/components/inspection-create/inspection-create.component";

import styles from "./page.module.css";

export const generateMetadata = generateDynamicMetadata("AdminTemplatesPage");

type Props = {
  params: Promise<{ equipmentId: string }>;
};

export default async function CreateInspectionPage({
  params,
}: Props): Promise<ReactNode> {
  const { equipmentId } = await params;

  const t = await getTranslations("InspectionsPage");

  return (
    <div className={styles["create-inspection"]}>
      <ToolbarComponent title={t("create")} parentHref="/inspections" />
      <InspectionCreateComponent equipmentId={equipmentId} />
    </div>
  );
}
