"use client";

import { ReactNode } from "react";

import { Text } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";

import { findOneUserApi } from "@/api/users/find-one-user.api";

import LoadingComponent from "@/components/loading/loading.component";

import { userKeys } from "@/queries/keys";

import UserFormComponent from "@/admin/users/components/user-form/user-form.component";

type Props = {
  id: string;
};

export default function UserEditComponent({ id }: Props): ReactNode {
  const { isPending, isError, error, data } = useQuery({
    queryKey: userKeys.one(id),
    queryFn: () => findOneUserApi(id),
  });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return <Text c="red">{error.message}</Text>;
  }

  return (
    <UserFormComponent id={id} initialValues={{ ...data, password: "" }} />
  );
}
