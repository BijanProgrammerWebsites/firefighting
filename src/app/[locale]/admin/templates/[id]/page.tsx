import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import TemplateEditComponent from "@/admin/templates/components/template-edit/template-edit.component";

import styles from "./page.module.css";

export const generateMetadata = generateDynamicMetadata("AdminTemplatesPage");

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditTemplatePage({
  params,
}: Props): Promise<ReactNode> {
  const { id } = await params;

  const t = await getTranslations("AdminTemplatesPage");

  return (
    <div className={styles["edit-template"]}>
      <ToolbarComponent title={t("edit")} parentHref="/admin/templates" />
      <TemplateEditComponent id={id} />
    </div>
  );
}
