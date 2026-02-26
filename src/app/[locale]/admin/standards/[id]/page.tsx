import { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import ToolbarComponent from "@/components/toolbar/toolbar.component";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import StandardEditComponent from "@/admin/standards/components/standard-edit/standard-edit.component";

import styles from "./page.module.css";

export const generateMetadata = generateDynamicMetadata("AdminStandardsPage");

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditStandardPage({
  params,
}: Props): Promise<ReactNode> {
  const { id } = await params;

  const t = await getTranslations("AdminStandardsPage");

  return (
    <div className={styles["edit-standard"]}>
      <ToolbarComponent title={t("edit")} parentHref="/admin/standards" />
      <StandardEditComponent id={id} />
    </div>
  );
}
