"use client";

import { ReactNode } from "react";

import { Text } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

import { findOneStandardApi } from "@/api/standards/find-one-standard.api";

import LoadingComponent from "@/components/loading/loading.component";

import { standardKeys } from "@/queries/keys";

import StandardFormComponent from "@/admin/standards/components/standard-form/standard-form.component";

type Props = {
  id: string;
};

export default function StandardEditComponent({ id }: Props): ReactNode {
  const { isPending, isError, error, data } = useQuery({
    queryKey: standardKeys.one(id),
    queryFn: () => findOneStandardApi(id),
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <Text c="red">{error.message}</Text>;
  }

  return <StandardFormComponent id={id} initialValues={data} />;
}
