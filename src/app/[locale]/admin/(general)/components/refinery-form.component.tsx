"use client";
import { ReactNode } from "react";

import { Stack, Text } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

import { findRefineryApi } from "@/api/refinery/find-refinery.api";

import LoadingComponent from "@/components/loading.component";

import { refineryKeys } from "@/queries/keys";

import RefineryLogoInputComponent from "@/admin/(general)/components/refinery-logo-input.component";
import RefineryTitleInputComponent from "@/admin/(general)/components/refinery-title-input.component";

export default function RefineryFormComponent(): ReactNode {
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
    <Stack>
      <RefineryLogoInputComponent picture={data.picture} />
      <RefineryTitleInputComponent title={data.title} />
    </Stack>
  );
}
