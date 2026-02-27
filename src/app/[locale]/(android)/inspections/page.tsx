import type { ReactNode } from "react";

import { getTranslations } from "next-intl/server";

import { Title } from "@mantine/core";

import { generateDynamicMetadata } from "@/utils/metadata.utils";

import BucketsComponent from "@/android/inspections/components/buckets/buckets.component";

import styles from "./page.module.css";

export const generateMetadata = generateDynamicMetadata("InspectionsPage");

export default async function InspectionsPage(): Promise<ReactNode> {
  const t = await getTranslations("InspectionsPage");

  return (
    <div className={styles.inspections}>
      <Title order={2}>{t("title")}</Title>
      <BucketsComponent />
    </div>
  );
}
