"use client";
import { ReactNode } from "react";

import { useQuery } from "@tanstack/react-query";

import { findRefineryApi } from "@/api/refinery/find-refinery.api";

import LoadingComponent from "@/components/loading/loading.component";

import { refineryKeys } from "@/queries/keys";

import LogoUploaderComponent from "@/admin/(general)/components/refinery-form/components/logo-uploader/logo-uploader.component";
import NameBoxComponent from "@/admin/(general)/components/refinery-form/components/name-box/name-box.component";
import SiteManagementComponent from "@/admin/(general)/components/refinery-form/components/site-management/site-management.component";

import styles from "./refinery-form.module.css";

export default function RefineryGeneralFormComponent(): ReactNode {
  const { isPending, data } = useQuery({
    queryKey: refineryKeys.find,
    queryFn: findRefineryApi,
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  return (
    <div className={styles["refinery-form"]}>
      <div className={styles.header}>
        <LogoUploaderComponent picture={data?.picture} />
        <NameBoxComponent title={data?.title} />
      </div>
      <SiteManagementComponent />
    </div>
  );
}
