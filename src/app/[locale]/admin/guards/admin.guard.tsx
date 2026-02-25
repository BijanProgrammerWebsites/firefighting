"use client";

import type { PropsWithChildren, ReactNode } from "react";

import { useLocale } from "next-intl";

import LoadingComponent from "@/components/loading/loading.component";

import { redirect } from "@/i18n/navigation";

import useVerifyQuery from "@/queries/use-verify.query";

type Props = PropsWithChildren;

export default function AdminGuard({ children }: Props): ReactNode {
  const locale = useLocale();

  const { data, isPending, isError } = useVerifyQuery();

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    redirect({ href: "/sign-in", locale });
    return <LoadingComponent />;
  }

  if (data.role !== "admin") {
    redirect({ href: "/", locale });
    return <LoadingComponent />;
  }

  return children;
}
