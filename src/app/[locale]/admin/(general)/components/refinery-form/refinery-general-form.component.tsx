"use client";
import { ReactNode } from "react";

import { Box, Text } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

import { findRefineryApi } from "@/api/refinery/find-refinery.api";

import LoadingComponent from "@/components/loading.component";

import { refineryKeys } from "@/queries/keys";

import LogoUploaderComponent from "@/admin/(general)/components/refinery-form/components/logo-uploader/logo-uploader.component";
import NameBoxComponent from "@/admin/(general)/components/refinery-form/components/name-box/name-box.component";
import SiteManagementComponent from "@/admin/(general)/components/refinery-form/components/site-management/site-management.component";

import styles from "./refinery-form.module.css";

export default function RefineryGeneralFormComponent(): ReactNode {
  const { isPending, isError, error, data } = useQuery({
    queryKey: refineryKeys.find,
    queryFn: findRefineryApi,
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <Text c="red">{error.message}</Text>;
  }

  return (
    <Box className={styles["refinery-form"]}>
      <Box className={styles.header}>
        <LogoUploaderComponent picture={data.picture} />
        <NameBoxComponent title={data.title} />
      </Box>
      <SiteManagementComponent />
    </Box>
  );
}
