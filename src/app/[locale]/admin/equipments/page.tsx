import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import EquipmentListComponent from "@/admin/equipments/components/equipment-list/equipment-list.component";

import styles from "./page.module.css";

export const generateMetadata = generateDynamicMetadata("AdminEquipmentsPage");

export default async function EquipmentsPage(): Promise<ReactNode> {
  const t = await getTranslations("AdminEquipmentsPage");

  return (
    <div className={styles.equipments}>
      <ToolbarComponent
        title={t("title")}
        createHref="/admin/equipments/create"
      />
      <EquipmentListComponent />
    </div>
  );
}
