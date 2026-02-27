"use client";

import { ReactNode } from "react";

import { Text } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

import { findOneTemplateApi } from "@/api/templates/find-one-template.api";

import LoadingComponent from "@/components/loading/loading.component";

import { templateKeys } from "@/queries/keys";

import TemplateFormComponent from "@/admin/templates/components/template-form/template-form.component";

type Props = {
  id: string;
};

export default function TemplateEditComponent({ id }: Props): ReactNode {
  const { isPending, isError, error, data } = useQuery({
    queryKey: templateKeys.one(id),
    queryFn: () => findOneTemplateApi(id),
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <Text c="red">{error.message}</Text>;
  }

  return <TemplateFormComponent id={id} initialValues={data} />;
}
