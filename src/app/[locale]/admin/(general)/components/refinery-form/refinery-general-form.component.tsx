"use client";
import { ReactNode, use } from "react";

import { useTranslations } from "next-intl";

import { TextInput } from "@mantine/core";

import LogoUploaderComponent from "@/admin/(general)/components/refinery-form/components/logo-uploader/logo-uploader.component";
import SiteManagementComponent from "@/admin/(general)/components/refinery-form/components/site-management/site-management.component";
import { RefineryGeneralFormContext } from "@/admin/(general)/contexts/refineryGeneralFormContext";

import styles from "./refinery-form.module.css";

export default function RefineryGeneralFormComponent(): ReactNode {
  const t = useTranslations("AdminGeneralPage");
  const { state, dispatch } = use(RefineryGeneralFormContext);
  return (
    <div className={styles["refinery-form"]}>
      <div className={styles.header}>
        <LogoUploaderComponent />
        <TextInput
          label={t("refineryName")}
          value={state.name}
          onChange={(e) => {
            dispatch({ type: "set_name", payload: e.target.value });
          }}
        />
      </div>
      <SiteManagementComponent />
    </div>
  );
}
