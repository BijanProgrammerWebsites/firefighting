import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import EquipmentFormComponent from "@/admin/equipments/components/equipment-form/equipment-form.component";

import styles from "./page.module.css";

export const generateMetadata = generateDynamicMetadata("AdminEquipmentsPage");

export default async function CreateEquipmentPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminEquipmentsPage");

  return (
    <div className={styles["create-equipment"]}>
      <ToolbarComponent title={t("create")} parentHref="/admin/equipments" />
      <EquipmentFormComponent />
    </div>
  );
}
