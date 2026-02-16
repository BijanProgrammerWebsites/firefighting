"use client";
import { ReactNode, use } from "react";

import { TextInput } from "@mantine/core";

import LogoUploaderComponent from "@/admin/(general)/components/refinery-form/components/logo-uploader/logo-uploader.component";
import SiteManagementComponent from "@/admin/(general)/components/refinery-form/components/site-management/site-management.component";
import { RefineryContext } from "@/admin/(general)/contexts/refinery.context";

import styles from "./refinery-form.module.css";

export default function RefineryFormComponent(): ReactNode {
  const { state, dispatch } = use(RefineryContext);
  return (
    <div className={styles["refinery-form"]}>
      <div className={styles.header}>
        <LogoUploaderComponent />
        <TextInput
          label="نام پالایشگاه"
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
