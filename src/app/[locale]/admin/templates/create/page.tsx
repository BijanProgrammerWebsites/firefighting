import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import TemplateFormComponent from "@/admin/templates/components/template-form/template-form.component";

import styles from "./page.module.css";

export const generateMetadata = generateDynamicMetadata("AdminTemplatesPage");

export default async function CreateTemplatePage(): Promise<ReactNode> {
  const t = await getTranslations("AdminTemplatesPage");

  return (
    <div className={styles["create-template"]}>
      <ToolbarComponent title={t("create")} parentHref="/admin/templates" />
      <TemplateFormComponent />
    </div>
  );
}
